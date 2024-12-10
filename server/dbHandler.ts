import { exists } from "jsr:@std/fs@^0.221.0/exists";
import { readJSONFile } from "./helpers.ts";
import { DBUser, DBGame, GameID, Username } from "./types/shared.ts";

export class DBHandler {
  constructor(
    private readonly _usersPath: string = "./db/users.json",
    private readonly _gamesPath: string = "./db/games.json"
  ) {}

  public async init(): Promise<boolean> {
    if (!(await exists(this._usersPath))) {
      try {
        await Deno.writeTextFile(this._usersPath, JSON.stringify([]));
      } catch (e) {
        console.error("Error creating user file:\n", e);
        return false;
      }
    }

    if (!(await exists(this._gamesPath))) {
      try {
        await Deno.writeTextFile(this._gamesPath, JSON.stringify([]));
      } catch (e) {
        console.error("Error creating games file:\n", e);
        return false;
      }
    }

    return true;
  }

  public async createUser(user: DBUser): Promise<boolean> {
    let _users: DBUser[] = [];
    try {
      _users = await readJSONFile(this._usersPath);
    } catch (e) {
      console.error("Error reading users file:\n", e);
      return false;
    }

    for (const _user of _users) {
      if (_user.username === user.username) {
        return false;
      }
    }

    _users.push(user);
    await Deno.writeTextFile(this._usersPath, JSON.stringify(_users));
    return true;
  }

  public async getUser(username: string): Promise<DBUser | null> {
    let _users: DBUser[] = [];
    try {
      _users = await readJSONFile(this._usersPath);
    } catch (e) {
      console.error("Error reading users file:", e);
      return null;
    }

    for (const _user of _users) {
      if (_user.username === username) {
        return _user;
      }
    }

    return null;
  }

  public async changeProfilePicture(username: Username, file: URL) {
    // TODO
  }

  public async createGame(game: {
    id?: GameID;
    rounds: any;
    users: string[];
  }): Promise<boolean> {
    let _games: DBGame[] = [];
    if (!game.id) {
      game.id = crypto.randomUUID();
    }

    try {
      _games = await readJSONFile(this._gamesPath);
    } catch (e) {
      console.error("Error reading games file:\n", e);
    }

    for (const _game of _games) {
      if (_game.id === game.id) {
        return false;
      }
    }

    _games.push(game as DBGame);
    return true;
  }

  public async getGame(id: GameID): Promise<DBGame | null> {
    let _games: DBGame[] = [];
    try {
      _games = await readJSONFile(this._gamesPath);
    } catch (e) {
      console.error("Error reading games file:", e);
      return null;
    }

    for (const _game of _games) {
      if (_game.id === id) {
        return _game;
      }
    }

    return null;
  }

  public async addFriend(
    sender: Username,
    receiver: Username
  ): Promise<boolean> {
    let _users: DBUser[] = [];
    try {
      _users = await readJSONFile(this._usersPath);
    } catch (e) {
      console.error("Error reading users file:\n", e);
      return false;
    }

    const _sender = _users.find((user) => user.username === sender);
    const _receiver = _users.find((user) => user.username === receiver);

    if (!_sender || !_receiver) {
      return false;
    }

    _sender.friends.push(receiver);
    _receiver.friends.push(sender);

    await Deno.writeTextFile(this._usersPath, JSON.stringify(_users));
    return true;
  }

  public async addGame(gameId: GameID, username: Username) {
    let _users: DBUser[] = [];
    try {
      _users = await readJSONFile(this._usersPath);
    } catch (e) {
      console.error("Error reading users file:\n", e);
      return false;
    }

    const _user = _users.find((user) => user.username === username);

    if (!_user) {
      return false;
    }

    _user.games.push(gameId);

    await Deno.writeTextFile(this._usersPath, JSON.stringify(_users));
  }

  public async removeGame(gameId: GameID, username: Username) {
    let _users: DBUser[] = [];
    try {
      _users = await readJSONFile(this._usersPath);
    } catch (e) {
      console.error("Error reading users file:\n", e);
      return false;
    }

    const _user = _users.find((user) => user.username === username);
    if (!_user) {
      return false;
    }

    const index = _user.games.indexOf(gameId);
    _user.games.splice(index, 1);

    await Deno.writeTextFile(this._usersPath, JSON.stringify(_users));
  }
}
