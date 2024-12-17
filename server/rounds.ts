import { Round } from "./round.ts";
import { Username, Coordinates } from "./types/shared.ts";

export class Rounds {
  constructor(
    public players: Username[],
    public cRound: number = 0,
    private _rounds: Round[] = []
  ) {
    for (let i = 0; i < players.length; i++) {
      const hider = this.players[i];
      const guessers = this.players.filter((player) => player !== hider);
      this._rounds.push(new Round(guessers, hider));
    }
  }

  // TODO implement winners, scoring etc.

  get playerCount(): number {
    return this.players.length;
  }

  get finished(): boolean {
    return this.cRound === this._rounds.length;
  }

  get roundCount(): string {
    return `${this.cRound}/${this._rounds.length}`;
  }

  get gameWinner(): { username: Username; score: number } {
    // calculate game winner
  }

  get roundWinner(): { username: Username; score: number } {
    return this._getRound().winner;
  }

  get roundScores(): { username: Username; score: number }[] {
    return this._getRound().scores;
  }

  public nextRound(): void {
    this.cRound++;
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
    return this._rounds[this.cRound];
  }
}
