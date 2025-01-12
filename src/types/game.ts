import { Username } from '~/types/user';

export type Room = {
  id: number;
  name: string;
  owner: Username;
  maxUser: number;
  currentUser: number;
  isPlaying: boolean;
};

export type RoomsQuery = {
  rooms: Room[];
  last: boolean;
};
