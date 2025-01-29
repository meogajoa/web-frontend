export enum GameStatus {
  Playing,
  Waiting,
}

export type GameStartRequest = {
  id: string; // Room id
};
