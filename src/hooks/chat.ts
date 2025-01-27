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
    const { error, data: message } = chatMessage.safeParse({
      ..._message,
      sendTime: new Date(_message.sendTime),
    });

    if (error) {
      throw new Error(error.message);
    }

    setMessages((prev) => [...prev, message]);
    setTimeout(() => onNewMessage?.(message), 0);
  });

  return messages;
};
