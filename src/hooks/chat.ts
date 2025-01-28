import React from 'react';
import { useSubscription } from 'react-stomp-hooks';
import { chatMessage, ChatMessage } from '~/types/chat';

export const useChatMessages = ({
  url,
  previousMessages = [],
  onNewMessage,
}: {
  url: string;
  previousMessages?: ChatMessage[];
  onNewMessage?: (message: ChatMessage) => void;
}) => {
  const [messages, setMessages] =
    React.useState<ChatMessage[]>(previousMessages);

  useSubscription(url, ({ body }) => {
    const _message = JSON.parse(body);
    const message = chatMessage.parse(_message);
    setMessages((prev) => [...prev, message]);
    setTimeout(() => onNewMessage?.(message), 0);
  });

  return messages;
};
