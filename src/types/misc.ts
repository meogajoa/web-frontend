export type Nullable<T> = T | null;

export type Optional<T> = T | undefined;

export type Maybe<T> = Optional<Nullable<T>>;

export enum Language {
  // En = 'en',
  Kr = 'kr',
  // Jp = 'jp',
  // Es = 'es',
  // ZhCn = 'zh-CN',
  // ZhTw = 'zh-TW',
}

export type Point = {
  x: number | string;
  y: number | string;
};
