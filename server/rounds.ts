import { Round } from "./round.ts";
import { Username, Coordinates } from "./types/shared.ts";

export class Rounds {
  constructor(
    private _players: Username[],
    public _cRound: number = 0,
    private _rounds: Round[] = []
  ) {
    for (let i = 0; i < _players.length; i++) {
      const hider = this._players[i];
      const guessers = this._players.filter((player) => player !== hider);
      this._rounds.push(new Round(guessers, hider));
    }
  }

  // TODO implement winners, scoring etc.

  get finished(): boolean {
    return this._cRound === this._rounds.length;
  }

  get gameWinner(): Username {
    return this._getRound().winner;
  }

  get roundWinner(): Username {
    return this._getRound().winner;
  }

  public nextRound(): void {
    this._cRound++;
  }

  public makeGuess(username: Username, coordinates: Coordinates): boolean {
    return this._getRound().makeGuess(username, coordinates);
  }

  public setSpot(
    username: Username,
    coordinates: Coordinates,
    file: string
  ): void {
    this._getRound().setSpot(username, coordinates, file);
  }

  private _getRound(): Round {
    return this._rounds[this._cRound];
  }
}
