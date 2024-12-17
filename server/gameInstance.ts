import { Rounds } from "./rounds.ts";
import { Username, Coordinates } from "./types/shared.ts";

export class GameInstance {
  constructor(
    players: Username[],
    public readonly id: string,
    public readonly rounds: Rounds = new Rounds(players)
  ) {}

  get name(): string {
    // SHOULDNT RETURN ID, SHOULD RETURN UNIQUE NAME
    return this.id;
  }

  get finished(): boolean {
    return this.rounds.finished;
  }

  get gameWinner(): { username: Username; score: number } {
    return this.rounds.gameWinner;
  }

  get roundWinner(): { username: Username; score: number } {
    return this.rounds.roundWinner;
  }

  get roundScores(): { username: Username; score: number }[] {
    return this.rounds.roundScores;
  }

  get roundCount(): string {
    return this.rounds.roundCount;
  }

  get playerCount(): number {
    return this.rounds.playerCount;
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
