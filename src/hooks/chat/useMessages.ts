import { useAccount } from '@/providers/AccountProvider';
import { useGame } from '@/providers/GameProvider';
import { useRoom } from '@/providers/RoomProvider';
import { defaultInitState } from '@/stores/room';
import {
  chatLogsSchema,
  chatMessageSchema,
  ChatRoom,
  personalChatLogsSchema,
  personalChatMessageSchema,
  type ChatMessage,
} from '@/types/chat';
import { Team } from '@/types/game';
import {
  convertToPersonalChatRoom,
  getPersonalChatRoomFromMessage,
  isPersonalChatRoom,
} from '@/utils/chat';
import { isValidUserNumber } from '@/utils/game';
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
  const { id, messagesByRoom, isPlaying, addMessage, setMessages } = useRoom();
  const { user } = useGame();

  useSubscription(
    compact([
      // Room lobby
      !isPlaying && `/topic/room/${id}/chat`,

      // In-game general
      isPlaying && `/topic/game/${id}/chat`,

      // In-game black
      isPlaying &&
        (user.team === Team.Black || user.eliminated) &&
        `/topic/game/${id}/chat/black`,

      // In-game white
      isPlaying &&
        (user.team === Team.White || user.eliminated) &&
        `/topic/game/${id}/chat/white`,

      // In-game red
      isPlaying &&
        (user.team === Team.Red || user.eliminated) &&
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
        `x-chat-room: ${xChatRoomHeader}\n`,
        `x-log-type: ${xLogTypeHeader}\n`,
        jsonBody,
      );

      switch (xLogTypeHeader) {
        case XLogType.History: {
          const history = chatLogsSchema.parse(jsonBody);
          history.chatLogs.forEach((message) => {
            message.id = message.sendTime.getTime().toString(); // FIXME: Replace this with actual id later
          });
          const chatRoom = convertToChatRoom(xChatRoomHeader);
          setMessages(chatRoom, history.chatLogs ?? []);
          break;
        }
        case XLogType.PersonalHistory: {
          const history = personalChatLogsSchema.parse(jsonBody);
          history.personalChatLogs?.sort(
            (a, b) => a.sendTime.getTime() - b.sendTime.getTime(),
          );

          const newMessagesMap = { ...defaultInitState.messagesByRoom };

          history.personalChatLogs?.forEach((_message) => {
            const message = { ..._message };
            message.id = message.sendTime.getTime().toString(); // FIXME: Replace this with actual id later
            const chatRoom = getPersonalChatRoomFromMessage(
              message,
              user.number,
            );
            newMessagesMap[chatRoom].push(message);
          });

          Object.entries(newMessagesMap).forEach(([_chatRoom, messages]) => {
            if (!isValidUserNumber(Number(_chatRoom))) {
              return;
            }

            const chatRoom = convertToPersonalChatRoom(Number(_chatRoom));
            if (!isPersonalChatRoom(chatRoom)) {
              return;
            }

            setMessages(chatRoom, messages);
          });

          break;
        }
        case XLogType.Single: {
          const message = chatMessageSchema.parse(jsonBody);
          message.id = message.sendTime.getTime().toString(); // FIXME: Replace this with actual id later
          const chatRoom = convertToChatRoom(xChatRoomHeader);
          addMessage(chatRoom, message);
          setTimeout(() => onNewMessage?.(message), 0);
          break;
        }
        case XLogType.PersonalSingle: {
          const personalMessage = personalChatMessageSchema.parse(jsonBody);
          personalMessage.id = personalMessage.sendTime.getTime().toString(); // FIXME: Replace this with actual id later
          const chatRoom = getPersonalChatRoomFromMessage(
            personalMessage,
            user.number,
          );
          addMessage(chatRoom, personalMessage);
          setTimeout(() => onNewMessage?.(personalMessage), 0);
          break;
        }
      }
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
