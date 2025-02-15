import { ChatRoom } from '@/types/chat';
import { Team, UserNumber } from '@/types/game';
import { assert } from '@/utils/assert';
import { isValidUserNumber } from '@/utils/game';

export const isTeam = (image: string | Team): image is Team => {
  return Object.values(Team).includes(image as Team);
};

export const convertToPersonalChatRoom = (userNumber: number): ChatRoom => {
  assert(isValidUserNumber(userNumber), `Invalid user number: ${userNumber}`);

  switch (userNumber) {
    case UserNumber.One:
      return ChatRoom.User01;
    case UserNumber.Two:
      return ChatRoom.User02;
    case UserNumber.Three:
      return ChatRoom.User03;
    case UserNumber.Four:
      return ChatRoom.User04;
    case UserNumber.Five:
      return ChatRoom.User05;
    case UserNumber.Six:
      return ChatRoom.User06;
    case UserNumber.Seven:
      return ChatRoom.User07;
    case UserNumber.Eight:
      return ChatRoom.User08;
    case UserNumber.Nine:
    default:
      return ChatRoom.User09;
  }
};
