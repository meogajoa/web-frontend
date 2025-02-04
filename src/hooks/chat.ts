import { useSubscription } from 'react-stomp-hooks';
import { useRoom } from '~/providers/RoomProvider';
import { chatMessage, ChatMessage, ChatRoom } from '~/types/chat';

export const useChatMessages = ({
  chatRoom,
  onNewMessage,
}: {
  chatRoom: ChatRoom;
  onNewMessage?: (message: ChatMessage) => void;
}) => {
  const { id, messagesByRoom, addMessage } = useRoom();

  useSubscription(getMessagesUrl(chatRoom), ({ body }) => {
    const _message = JSON.parse(body);
    const message = chatMessage.parse(_message);
    addMessage(chatRoom, message);
    setTimeout(() => onNewMessage?.(message), 0);
  });

  return messagesByRoom[chatRoom];

  function getMessagesUrl(chatRoom: ChatRoom) {
    return `/topic/room/${id}/chat`;
  }
};
