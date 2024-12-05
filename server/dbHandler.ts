import { exists } from "jsr:@std/fs@^0.221.0/exists";
import { readJSONFile } from "./helpers.ts";
import { DBUser } from "./types/shared.ts";

export class DBHandler {
  constructor(
    private readonly _usersPath = "./db/users.json",
    private readonly _gamesPath = "./db/games.json"
  ) {}

  async init() {
    if (!(await exists(this._usersPath))) {
      try {
        await Deno.writeTextFile(this._usersPath, JSON.stringify([]));
      } catch (e) {
        console.error("Error creating user file:\n", e);
        return null;
      }
    }

    if (!(await exists(this._gamesPath))) {
      try {
        await Deno.writeTextFile(this._gamesPath, JSON.stringify([]));
      } catch (e) {
        console.error("Error creating games file:\n", e);
        return null;
      }
    }
  }

  async getUser(username: string): Promise<DBUser | null> {
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

  async addUser(user: DBUser): Promise<boolean> {
    let _users: DBUser[] = [];
    try {
      _users = await readJSONFile(this._usersPath);
    } catch (e) {
      console.error("Error reading users file:", e);
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

  async changeProfilePicture(username: string, fileName: string) {
    // TODO
  }

  // async getGame(gameId: number): Promise<Game | null> {
  //   let _games: Game[] = [];
  //   try {
  //     _games = await readJSONFile(this._gamesPath);
  //   } catch (e) {
  //     console.error(e);
  //     return null;
  //   }

  //   return new Game();
  // }
}
