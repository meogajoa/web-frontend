import { compact } from 'lodash-es';
import { useSubscription } from 'react-stomp-hooks';
import { useAccount } from '~/providers/AccountProvider';
import { useGame } from '~/providers/GameProvider';
import { useRoom } from '~/providers/RoomProvider';
import {
  chatMessage,
  ChatMessage,
  ChatRoom,
  XChatRoom,
  xChatRoom,
} from '~/types/chat';
import { Team } from '~/types/game';
import { assert } from '~/utils/assert';

export const useChatMessages = ({
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
  const { player } = useGame();

  useSubscription(
    compact([
      // room lobby
      !isPlaying && `/topic/room/${id}/chat`,
    ]),
    ({ body }) => {
      const jsonData = JSON.parse(body);
      const message = chatMessage.parse(jsonData);
      addMessage(ChatRoom.Lobby, message);
      setTimeout(() => onNewMessage?.(message), 0);
    },
  );

  useSubscription(
    compact([
      // in-game general
      isPlaying && player.alive && `/topic/game/${id}/chat`,

      // in-game black
      isPlaying &&
        player.alive &&
        (player.team === Team.Black || player.isSpy) &&
        `/topic/game/${id}/chat/black`,

      // in-game white
      isPlaying &&
        player.alive &&
        (player.team === Team.White || player.isSpy) &&
        `/topic/game/${id}/chat/white`,

      // in-game eliminated
      isPlaying && !player.alive && `/topic/game/${id}/chat/eliminated`,

      // in-game personal
      isPlaying && player.alive && `/topic/user/${account.nickname}/gameChat`,
    ]),
    ({ headers, body }) => {
      const { 'x-chat-room': _inComingChatRoom } = headers;
      const inComingChatRoom = xChatRoom.parse(_inComingChatRoom);

      const jsonData = JSON.parse(body);
      const message = chatMessage.parse(jsonData);

      switch (inComingChatRoom) {
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
          // sender id is the user's own id when x-chat-room is PERSONAL
          const senderId = Number(message.sender);
          assert(
            !Number.isNaN(senderId) &&
              Number.isInteger(senderId) &&
              senderId >= 1 &&
              senderId <= 8,
            `Invalid sender id: ${senderId}`,
          );

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
          throw new Error(`Unknown chat room: ${inComingChatRoom}`);
      }

      setTimeout(() => onNewMessage?.(message), 0);
    },
  );

  return messagesByRoom[variables.chatRoom];
};
