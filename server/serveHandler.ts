import * as bcrypt from "https://deno.land/x/bcrypt/mod.ts";
import { serveDir } from "jsr:@std/http/file-server";
import {
  WebSocketMessage,
  UserCredentials,
  SocketMap,
  AuthKey,
  DBUser,
} from "./types/shared.ts";
import { sendRes } from "./helpers.ts";
import { DBHandler } from "./dbHandler.ts";

export class ServeHandler {
  constructor(
    private _sockets: SocketMap = new Map(),
    private _dbHandler: DBHandler = new DBHandler()
  ) {
    this._dbHandler.init();
  }

  public serve(): void {
    Deno.serve(
      { port: 8888, hostname: "localhost" },
      this.handleReq.bind(this)
    );
  }

  public async handleReq(req: Request): Promise<Response> {
    switch (req.method) {
      case "GET": {
        if (req.headers.get("upgrade") === "websocket") {
          return await this._handleWsReq(req);
        }

        return await this._handleHttpGet(req);
      }

      case "POST":
        return await this._handleHttpPost(req);

      default:
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
          friendRequests: [],
          friends: [],
          games: [],
          profilePic: "default.png",
        };

        if (!(await this._dbHandler.addUser(_newUser))) {
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
      return sendRes(404, {
        error: `Resource '${_path}' not found. WebSocket upgrade requests need to be made to /socket`,
      });
    }

    if (!_params.has("key")) {
      return sendRes(400, { error: "Missing key parameter" });
    }

    const _key = _params.get("key") as AuthKey;
    if (!this._sockets.has(_key)) {
      return sendRes(401, { error: "Invalid authentication key" });
    }

    const { socket, response }: { socket: WebSocket; response: Response } =
      Deno.upgradeWebSocket(req);

    this._sockets.set(_key, {
      socket,
      username: this._sockets.get(_key)!.username,
    });

    socket.addEventListener("open", () => {
      console.log(
        `Socket ${_key} - ${this._sockets.get(_key)!.username} opened.`
      );
    });

    socket.addEventListener("message", (e: MessageEvent) => {
      try {
        const { event, data }: WebSocketMessage = JSON.parse(e.data);
        switch (event) {
          default:
            break;
        }
      } catch (error) {
        socket.send(
          JSON.stringify({
            type: "messageError",
            payload: "An error occurred while handling your request.",
          })
        );
        console.error(`Error parsing message. ${String(error)}`);
        console.error(e.data);
      }
    });

    socket.addEventListener("close", () => {
      `Socket ${_key} - ${this._sockets.get(_key)!.username} closed.`;
    });

    socket.addEventListener("error", () => {
      `Socket ${_key} - ${this._sockets.get(_key)!.username} errored.`;
    });

    return response;
  }
}
