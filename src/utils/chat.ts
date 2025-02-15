import { ChatRoom, type PersonalChatMessage } from '@/types/chat';
import { Team, UserNumber } from '@/types/game';
import { assert } from '@/utils/assert';
import { convertToUserNumber, isValidUserNumber } from '@/utils/game';

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
      return ChatRoom.User09;
    default:
      return ChatRoom.Personal;
  }
};

export const getPersonalChatRoomFromMessage = (
  message: PersonalChatMessage,
  myNumber: UserNumber,
): ChatRoom => {
  const receiverNumber = convertToUserNumber(message.receiver);
  const senderNumber = convertToUserNumber(message.sender);

  return convertToPersonalChatRoom(
    receiverNumber === myNumber ? senderNumber : receiverNumber,
  );
};

export const isPersonalChatRoom = (chatRoom: ChatRoom) => {
  return (
    chatRoom === ChatRoom.User01 ||
    chatRoom === ChatRoom.User02 ||
    chatRoom === ChatRoom.User03 ||
    chatRoom === ChatRoom.User04 ||
    chatRoom === ChatRoom.User05 ||
    chatRoom === ChatRoom.User06 ||
    chatRoom === ChatRoom.User07 ||
    chatRoom === ChatRoom.User08 ||
    chatRoom === ChatRoom.User09 ||
    chatRoom === ChatRoom.Personal
  );
};
