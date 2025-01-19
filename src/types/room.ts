import type { Username } from '~/types/account';

export type CreateRoomForm = {
  name: string;
  password: string;
};

export type CreateRoomResponse = {
  id: string;
};

export type Room = {
  id: string;
  name: string;
  owner: Username;
  maxUser: number;
  currentUser: number;
  isPlaying: boolean;
};

export type PaginatedRoomsResponse = {
  rooms: Room[];
  last: boolean;
};
