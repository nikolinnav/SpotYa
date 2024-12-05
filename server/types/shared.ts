export type WebSocketMessage = Readonly<{
  event: string;
  data: object | null;
}>;

export type UserCredentials = Readonly<{
  username: string;
  password: string;
}>;

export type AuthKey = `${string}-${string}-${string}-${string}-${string}`;
export type SocketMap = Map<
  AuthKey,
  { socket: WebSocket | null; username: string }
>;
export type DBUser = Readonly<{
  username: string;
  password: string;
  friendRequests: string[];
  friends: string[];
  games: number[];
  profilePic: string;
}>;
