import { Username, GameID } from "./types/shared.ts";
import { GameInstance } from "./gameInstance.ts";

export class State {
  constructor(
    private readonly _gameInvitations: {
      id: GameID;
      invitations: Username[];
      accepted: Username[];
    }[] = [],
    private readonly _friendRequests: {
      sender: Username;
      receiver: Username;
    }[] = [],
    private readonly _activeGames: GameInstance[] = []
  ) {}

  public createGameInvitation(
    id: GameID,
    invitations: Username[],
    creator: Username
  ): void {
    this._gameInvitations.push({ id, invitations, accepted: [creator] });
  }
  public handleGameInvitation(
    id: GameID,
    username: Username,
    accept: boolean
  ): boolean | null {
    const _game = this._gameInvitations.find((game) => game.id === id);
    if (!_game || !_game.invitations.includes(username)) {
      return null;
    }

    const idx = _game.invitations.indexOf(username);
    if (accept) {
      _game.accepted.push(username);
    }

    _game.invitations.splice(idx, 1);
    if (_game.invitations.length === 0) {
      this._gameInvitations.splice(this._gameInvitations.indexOf(_game), 1); // TODO needed?
      this._activeGames.push(new GameInstance(_game.accepted, id));
      return true;
    }
    return _game.invitations.length === 0;
  }

  public createFriendRequest(sender: Username, receiver: Username): void {
    const exists = this._friendRequests.some(
      (request) => request.sender === sender && request.receiver === receiver
    );
    if (!exists) {
      this._friendRequests.push({ sender, receiver });
    }
  }

  public removeFriendRequest(req: Username, res: Username): boolean {
    const idx = this._friendRequests.findIndex(
      (request) => request.sender === req && request.receiver === res
    );
    if (idx === -1) {
      return false;
    }

    this._friendRequests.splice(idx, 1);
    return true;
  }

  public getGameInstance(id: GameID): GameInstance | null {
    return this._activeGames.find((game) => game.id === id) || null;
  }

  // TODO I don't think this function is needed
  private _createGameInstance(id: GameID, players: Username[]) {
    const gameInstance = new GameInstance(players, id);
    this._activeGames.push(gameInstance);
  }
}
