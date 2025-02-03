export type GameStartRequest = {
  id: string;
};

export enum Team {
  Invalid = 'INVALID',
  Black = 'BLACK',
  White = 'WHITE',
}

export type Player = {
  team: Team;
  number: number;
  alive: boolean;
  money?: number;
  isSpy?: boolean;
  profimeImageSrc?: string;
};

export enum PlayerNumber {
  Invalid,
  One,
  Two,
  Three,
  Four,
  Five,
  Six,
  Seven,
  Eight,
}

export type PlayerNumberKey = keyof typeof PlayerNumber;

export enum GameTime {
  Invalid = 'INVALID',
  Night = 'NIGHT',
  Morning = 'MORNING',
}
