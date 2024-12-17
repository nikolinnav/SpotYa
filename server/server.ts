import { serveTls } from "https://deno.land/std@0.166.0/http/server.ts";
import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";
import { serveDir } from "jsr:@std/http/file-server";
import {
  WebSocketMessage,
  UserCredentials,
  SocketMap,
  AuthKey,
  DBUser,
  Username,
} from "./types/shared.ts";
import { sendRes } from "./helpers.ts";
import { DBHandler } from "./dbHandler.ts";
import { GameInstance } from "./gameInstance.ts";
import { Rounds } from "./rounds.ts";
import { State } from "./state.ts";

export class Server {
  constructor(
    private readonly _sockets: SocketMap = new Map(),
    private readonly _dbHandler: DBHandler = new DBHandler(),
    private readonly _state: State = new State()
  ) {
    this._dbHandler.init();
  }

  public start(): void {
    Deno.serve(
      { port: 8888, hostname: "localhost" },
      this.handleReq.bind(this)
    );
  }

  // public start(): void {
  //   serveTls(this.handleReq.bind(this), {
  //     port: 8888,
  //     hostname: "0.0.0.0",
  //     certFile: "cert.pem",
  //     keyFile: "key.pem",
  //   });
  // }

  public async handleReq(req: Request): Promise<Response> {
    console.log("HTTP Request made\n");
    console.log(req);
    switch (req.method) {
      case "GET": {
        if (
          req.headers.get("connection") === "Upgrade" &&
          req.headers.get("upgrade") === "websocket"
        ) {
          console.log("WS Request");
          return await this._handleWsReq(req);
        }
        console.log("HTTP GET Request");
        return await this._handleHttpGet(req);
      }

      case "POST":
        console.log("HTTP POST Request");
        return await this._handleHttpPost(req);

      default:
        console.log("BAD REQUEST");
        return sendRes(400, { error: "Bad request" });
    }
  }

  private async _handleHttpGet(req: Request): Promise<Response> {
    return await serveDir(req, { fsRoot: "./../public" });
  }

  private async _handleHttpPost(req: Request): Promise<Response> {
    if (req.headers.get("Content-Type") !== "application/json") {
      return sendRes(400, {
        error:
          "Request body must be JSON (Content-Type header missing in request)",
      });
    }

    const _path: string = new URL(req.url).pathname;
    const _userCredentials: UserCredentials = await req.json();
    if (
      !(
        typeof _userCredentials === "object" &&
        _userCredentials.username &&
        _userCredentials.password
      )
    ) {
      return sendRes(400, {
        error: "Request body not valid. Username and password required",
      });
    }
    const { username: _username, password: _password }: UserCredentials =
      _userCredentials;

    switch (_path) {
      case "/login": {
        const _user: DBUser | null = await this._dbHandler.getUser(_username);
        if (!_user) {
          return sendRes(401, { error: "Invalid username or password" });
        }

        if (!(await bcrypt.compare(_password, _user.password))) {
          return sendRes(401, { error: "Invalid username or password" });
        }

        const authKey: AuthKey = crypto.randomUUID();
        this._sockets.set(authKey, { socket: null, username: _username });
        return sendRes(200, { key: authKey, message: "Login successful" });
      }

      case "/register": {
        const _newUser: DBUser = {
          username: _username,
          password: await bcrypt.hash(_password),
          friends: [],
          games: [],
          profilePic: "default.png",
        };

        if (!(await this._dbHandler.createUser(_newUser))) {
          return sendRes(409, { error: "Username already exists" });
        }

        const authKey: AuthKey = crypto.randomUUID();
        this._sockets.set(authKey, { socket: null, username: _username });
        return sendRes(200, { key: authKey, message: "Login successful" });
      }

      default:
        return sendRes(404, { error: `Resource '${_path}' not found` });
    }
  }

  private async _handleWsReq(req: Request): Promise<Response> {
    const _url: URL = new URL(req.url);
    const _params: URLSearchParams = _url.searchParams;
    const _path: string = _url.pathname;
    if (_path !== "/socket") {
      console.log("Endpoint not found");
      return sendRes(404, {
        error: `Endpoint '${_path}' not found. WebSocket upgrade requests need to be made to /socket`,
      });
    }

    if (!_params.has("key")) {
      console.log("Missing key parameter");
      return sendRes(400, { error: "Missing key parameter" });
    }

    const _key = _params.get("key") as AuthKey;
    if (!this._sockets.has(_key)) {
      console.log("Invalid authentication key");
      return sendRes(401, { error: "Invalid authentication key" });
    }

    const { socket, response }: { socket: WebSocket; response: Response } =
      Deno.upgradeWebSocket(req);

    const _username = this._sockets.get(_key)!.username;

    this._sockets.set(_key, {
      socket,
      username: _username,
    });

    socket.addEventListener("open", (): void => {
      // TODO Add friend requests and game invitations getting sent to client on connect
      console.log(`Socket ${_key} - ${_username} opened.`);
    });

    socket.addEventListener(
      "message",
      async (e: MessageEvent): Promise<void> => {
        try {
          const { event, data }: WebSocketMessage = JSON.parse(e.data);
          switch (event) {
            // GET USER
            case "cl:getUser": {
              console.log(`Socket ${_key} - ${_username} requested user data.`);
              socket.send(
                JSON.stringify({
                  event: "sv:user",
                  data: { username: _username, profilePicture: "default.png" },
                })
              );
              break;
            }
            // FRIEND EVENTS
            case "cl:getAllFriends": {
              console.log(
                `Socket ${_key} - ${_username} requested all friends.`
              );
              const _user: DBUser = (await this._dbHandler.getUser(
                _username
              )) as DBUser;

              socket.send(
                JSON.stringify({
                  event: "sv:allFriends",
                  data: { friends: _user.friends },
                })
              );
              break;
            }

            case "cl:getFriend": {
              console.log(
                `Socket ${_key} - ${_username} requested friend data.`
              );

              socket.send(
                JSON.stringify({
                  event: "sv:friend",
                  data: {
                    username: data.username,
                    profilePicture: "default.png",
                  },
                })
              );
              break;
            }

            case "cl:addFriend": {
              this._state.createFriendRequest(_username, data.receiver);
              this._sockets.values().forEach((_socket) => {
                if (_socket.username === data.receiver) {
                  if (_socket.socket !== null) {
                    _socket.socket.send(
                      JSON.stringify({
                        event: "sv:friendRequest",
                        data: { username: _username },
                      })
                    );
                  }
                }
              });
              console.log(
                `Socket ${_key} - ${_username} requested to add a friend.`
              );
              break;
            }

            case "cl:acceptFriend": {
              this._state.removeFriendRequest(data.sender, _username);
              this._dbHandler.addFriend(data.sender, _username);

              socket.send(
                JSON.stringify({
                  event: "sv:friendAdded",
                  data: { username: data.sender },
                })
              );

              this._sockets.values().forEach((_socket) => {
                if (_socket.username === data.sender) {
                  if (_socket.socket !== null) {
                    _socket.socket.send(
                      JSON.stringify({
                        event: "sv:friendAdded",
                        data: { username: _username },
                      })
                    );
                  }
                }
              });
              break;
            }

            case "cl:rejectFriend": {
              this._state.removeFriendRequest(data.sender, data.receiver);
              break;
            }
            // GAME EVENTS

            case "cl:getAllGames": {
              console.log(`Socket ${_key} - ${_username} requested all games.`);
              socket.send(JSON.stringify({ event: "sv:allGames", data: null }));
              break;
            }

            case "cl:getGame": {
              console.log(`Socket ${_key} - ${_username} requested game data.`);
              socket.send(JSON.stringify({ event: "sv:game", data: null }));
              break;
            }

            case "cl:createGame": {
              const gameId = crypto.randomUUID();
              this._state.createGameInvitation(gameId, data.users);
              this._sockets.values().forEach((_socket) => {
                if (data.users.includes(_socket.username)) {
                  if (_socket.socket !== null) {
                    _socket.socket.send(
                      JSON.stringify({
                        event: "sv:gameInvitation",
                        data: { gameId: gameId },
                      })
                    );
                  }
                }
              });
              console.log(
                `Socket ${_key} - ${_username} requested to create a game.`
              );
              break;
            }

            case "cl:acceptGame": {
              this._state.handleGameInvitation(data.gameId, _username, true);
              // TODO CHECK IF GAME SHOULD START
              this._dbHandler.addGame(data.gameId, _username);

              break;
            }

            case "cl:rejectGame": {
              this._state.handleGameInvitation(data.gameId, _username, false);
              // TODO CHECK IF GAME SHOULD START
              break;
            }

            default:
              break;
          }
        } catch (e) {
          console.error(`Error parsing message:\n${e}`);
        }
      }
    );

    socket.addEventListener("close", (): void => {
      this._sockets.get(_key)!.socket = null;
      console.log(`Socket ${_key} - ${_username} closed.`);
    });

    socket.addEventListener("error", (): void => {
      this._sockets.get(_key)!.socket = null;
      console.log(`Socket ${_key} - ${_username} errored.`);
    });

    return response;
  }
}
