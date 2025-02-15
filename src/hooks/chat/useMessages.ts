import { useAccount } from '@/providers/AccountProvider';
import { useGame } from '@/providers/GameProvider';
import { useRoom } from '@/providers/RoomProvider';
import { chatMessage, type ChatMessage, ChatRoom } from '@/types/chat';
import { Team } from '@/types/game';
import { assert } from '@/utils/assert';
import { compact } from 'lodash-es';
import { useSubscription } from 'react-stomp-hooks';
import { z } from 'zod';

enum XChatRoom {
  Lobby = 'LOBBY',
  Personal = 'PERSONAL',
  General = 'GENERAL',
  Black = 'BLACK',
  White = 'WHITE',
  Eliminated = 'ELIMINATED',
}
const xChatRoom = z.nativeEnum(XChatRoom);

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
    ]),
    ({ body }) => {
      const jsonBody = JSON.parse(body);
      const message = chatMessage.parse(jsonBody);
      addMessage(ChatRoom.Lobby, message);
      setTimeout(() => onNewMessage?.(message), 0);

      console.debug(`/topic/room/${id}/chat: `, message);
    },
  );

  useSubscription(
    compact([
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
      const xChatRoomHeader = xChatRoom.parse(headers['x-chat-room']);

      const jsonBody = JSON.parse(body);
      const message = chatMessage.parse(jsonBody);

      console.debug(`/topic/game/${id}/chat: `, message);

      // Sender id is the user's own id
      const senderId = Number(message.sender);
      assert(
        !Number.isNaN(senderId) &&
          Number.isInteger(senderId) &&
          senderId >= 1 &&
          senderId <= 8,
        `Invalid sender id: ${senderId}`,
      );

      switch (xChatRoomHeader) {
        case XChatRoom.General:
          addMessage(ChatRoom.General, message);
          break;
        case XChatRoom.Black:
          addMessage(ChatRoom.Black, message);
          break;
        case XChatRoom.White:
          addMessage(ChatRoom.White, message);
          break;
        case XChatRoom.Eliminated:
          addMessage(ChatRoom.Eliminated, message);
          break;
        case XChatRoom.Personal:
          if (senderId === 1) {
            addMessage(ChatRoom.User01, message);
          } else if (senderId === 2) {
            addMessage(ChatRoom.User02, message);
          } else if (senderId === 3) {
            addMessage(ChatRoom.User03, message);
          } else if (senderId === 4) {
            addMessage(ChatRoom.User04, message);
          } else if (senderId === 5) {
            addMessage(ChatRoom.User05, message);
          } else if (senderId === 6) {
            addMessage(ChatRoom.User06, message);
          } else if (senderId === 7) {
            addMessage(ChatRoom.User07, message);
          } else if (senderId === 8) {
            addMessage(ChatRoom.User08, message);
          }

          break;
        default:
          throw new Error(`Unknown chat room: ${xChatRoomHeader}`);
      }

      setTimeout(() => onNewMessage?.(message), 0);
    },
  );

  return messagesByRoom[variables.chatRoom];
};

export default useChatMessages;
