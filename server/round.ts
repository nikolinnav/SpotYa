import { Username, Coordinates } from "./types/shared.ts";
import { haversine } from "./helpers.ts";

export class Round {
  public readonly guessers: Array<{
    readonly username: Username;
    coordinates: Coordinates;
  }>;
  public readonly hider: {
    readonly username: Username;
    coordinates: Coordinates;
    photo: string;
  };

  constructor(guessers: Username[], hider: Username) {
    this.guessers = guessers.map((guesser) => ({
      username: guesser,
      coordinates: { latitude: null, longitude: null },
    }));

    this.hider = {
      username: hider,
      photo: "",
      coordinates: { latitude: null, longitude: null },
    };
  }

  get winner(): { username: Username; score: number } {
    if (!this.finished) throw new Error("Game is not yet finished.");
    return this.scores[0];
  }

  get scores(): { username: Username; score: number }[] {
    if (!this.finished) throw new Error("Game is not yet finished.");
    return this.guessers
      .map((guesser) => ({
        username: guesser.username,
        score: this._score(guesser.username),
      }))
      .sort((a, b) => a.score - b.score);
  }

  private _score(username: Username): number {
    const guesser = this.guessers.find(
      (guesser) => guesser.username === username
    );
    if (guesser) {
      return haversine(this.hider.coordinates, guesser.coordinates);
    }
    return Infinity;
  }

  get finished(): boolean {
    return this.guessers.every(
      (guesser) =>
        guesser.coordinates.latitude !== null &&
        guesser.coordinates.longitude !== null
    );
  }

  public makeGuess(username: Username, coordinates: Coordinates): boolean {
    const guesser = this.guessers.find(
      (guesser) => guesser.username === username
    );
    if (guesser) {
      guesser.coordinates = coordinates;
    }

    return this.finished;
  }

  public setSpot(
    username: Username,
    coordinates: Coordinates,
    file: string
  ): void {
    if (this.hider.username === username) {
      this.hider.coordinates = coordinates;
      this.hider.photo = file;
    }
  }
}
