declare class Round {
  public readonly hider: {
    readonly username: Username;
    readonly photo: string;
    readonly coordinates: Coordinates;
  };
  public readonly guessers: Array<{
    readonly username: Username;
    readonly coordinates: Coordinates;
  }>;
}

// FALLBACK
declare interface GeolocationCoordinates {
  latitude: number;
  longitude: number;
  altitude: number | null;
  accuracy: number;
  altitudeAccuracy: number | null;
  heading: number | null;
  speed: number | null;
}

export type AuthKey = `${string}-${string}-${string}-${string}-${string}`;
export type GameID = AuthKey;
export type Username = string;

export type WebSocketMessage = Readonly<{
  event: string;
  data: any;
}>;

export type UserCredentials = Readonly<{
  username: string;
  password: string;
}>;

export type SocketMap = Map<
  AuthKey,
  { socket: WebSocket | null; username: Username }
>;
export type DBUser = Readonly<{
  username: Username;
  password: string;
  friends: Username[];
  games: GameID[];
  profilePic: string;
}>;

export type Coordinates = { latitude: number | null; longitude: number | null };

export type DBGame = Readonly<{ id: GameID; rounds: any; users: Username[] }>;
