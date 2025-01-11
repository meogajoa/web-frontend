import { Username } from '~/types/user';

export type Room = {
  roomId: number;
  roomName: string;
  roomOwner: Username;
  roomMaxUser: number;
  roomCurrentUser: number;
  roomIsPlaying: boolean;
};

export type RoomsQuery = {
  rooms: Room[];
  last: boolean;
};
