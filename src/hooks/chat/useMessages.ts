import { useAccount } from '@/providers/AccountProvider';
import { useGame } from '@/providers/GameProvider';
import { useRoom } from '@/providers/RoomProvider';
import { chatMessageSchema, ChatRoom, type ChatMessage } from '@/types/chat';
import { Team } from '@/types/game';
import { convertToPersonalChatRoom } from '@/utils/chat';
import { convertToUserNumber } from '@/utils/game';
import { compact } from 'lodash-es';
import { useSubscription } from 'react-stomp-hooks';
import { z } from 'zod';

enum XChatRoom {
  Lobby = 'LOBBY',
  Personal = 'PERSONAL',
  General = 'GENERAL',
  Black = 'BLACK',
  White = 'WHITE',
  Red = 'RED',
  Eliminated = 'ELIMINATED',
}
const xChatRoomSchema = z.nativeEnum(XChatRoom);

enum XLogType {
  PersonalSingle = 'PERSONAL_SINGLE',
  PersonalHistory = 'PERSONAL_HISTORY',
  Single = 'SINGLE',
  History = 'HISTORY',
}
const xLogTypeSchema = z.nativeEnum(XLogType);

const useChatMessages = ({
  variables,
  onNewMessage,
}: {
  variables: {
    chatRoom: ChatRoom;
  };
  onNewMessage?: (message: ChatMessage) => void;
}) => {
  const { account } = useAccount();
  const { id, messagesByRoom, addMessage, isPlaying } = useRoom();
  const { user } = useGame();

  useSubscription(
    compact([
      // Room lobby
      !isPlaying && `/topic/room/${id}/chat`,

      // In-game general
      isPlaying && !user.eliminated && `/topic/game/${id}/chat`,

      // In-game black
      isPlaying &&
        !user.eliminated &&
        user.team === Team.Black &&
        `/topic/game/${id}/chat/black`,

      // In-game white
      isPlaying &&
        !user.eliminated &&
        user.team === Team.White &&
        `/topic/game/${id}/chat/white`,

      // In-game red
      isPlaying &&
        !user.eliminated &&
        user.team === Team.Red &&
        `/topic/game/${id}/chat/red`,

      // In-game eliminated
      isPlaying && user.eliminated && `/topic/game/${id}/chat/eliminated`,

      // In-game personal
      isPlaying &&
        !user.eliminated &&
        `/topic/user/${account.nickname}/gameChat`,
    ]),
    ({ headers, body }) => {
      const jsonBody = JSON.parse(body);
      const xChatRoomHeader = xChatRoomSchema.parse(headers['x-chat-room']);
      const xLogTypeHeader = xLogTypeSchema.parse(headers['x-log-type']);

      console.debug(
        `x-chat-room: ${xChatRoomHeader}`,
        `x-log-type: ${xLogTypeHeader}`,
        jsonBody,
      );

      const message = chatMessageSchema.parse(jsonBody);
      const chatRoom = convertToChatRoom(xChatRoomHeader);

      if (chatRoom === ChatRoom.Personal) {
        // Sender id is the in-game user number
        const usernumber = convertToUserNumber(message.sender);
        const personalChatRoom = convertToPersonalChatRoom(usernumber);
        addMessage(personalChatRoom, message);
      } else {
        addMessage(chatRoom, message);
      }

      setTimeout(() => onNewMessage?.(message), 0);
    },
  );

  return messagesByRoom[variables.chatRoom];
};

const convertToChatRoom = (xChatRoom: XChatRoom): ChatRoom => {
  switch (xChatRoom) {
    case XChatRoom.Lobby:
      return ChatRoom.Lobby;
    case XChatRoom.General:
      return ChatRoom.General;
    case XChatRoom.Black:
      return ChatRoom.Black;
    case XChatRoom.White:
      return ChatRoom.White;
    case XChatRoom.Red:
      return ChatRoom.Red;
    case XChatRoom.Eliminated:
      return ChatRoom.Eliminated;
    case XChatRoom.Personal:
    default:
      return ChatRoom.Personal;
  }
};

export default useChatMessages;
