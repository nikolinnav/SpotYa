import { Rounds } from "./rounds.ts";
import { Username, Coordinates } from "./types/shared.ts";

export class GameInstance {
  constructor(
    players: Username[],
    public readonly id: string,
    public readonly rounds: Rounds = new Rounds(players)
  ) {}

  get finished(): boolean {
    return this.rounds.finished;
  }

  get gameWinner(): Username {
    return this.rounds.gameWinner;
  }

  get roundWinner(): Username {
    return this.rounds.roundWinner;
  }

  public makeGuess(username: Username, coordinates: Coordinates): void {
    if (this.rounds.makeGuess(username, coordinates)) {
      this.rounds.nextRound();
    }
  }

  public setSpot(
    username: Username,
    coordinates: Coordinates,
    file: string
  ): void {
    this.rounds.setSpot(username, coordinates, file);
  }
}
