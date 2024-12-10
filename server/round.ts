import { Username, Coordinates } from "./types/shared.ts";

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

  get winner(): Username {
    // TODO calculate winner
    return "hello :)";
  }

  get scores(): { username: Username; score: number }[] {
    // TODO calculate scores
    const scores: { username: Username; score: number }[] = [];
    this.guessers.forEach((guesser) => {
      scores.push({
        username: guesser.username,
        score: this.score(guesser.username),
      });
    });
    return scores.sort((a, b) => b.score - a.score);
  }
  score(username: Username): number {
    // TODO calculate score
    return 0;
  }

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
