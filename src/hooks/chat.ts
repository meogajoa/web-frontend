import React from 'react';
import { useSubscription } from 'react-stomp-hooks';
import { ChatMessage } from '~/types/chat';
import { useSessionId } from './account';

export const useChatMessages = ({
  url,
  previousMessages = [],
}: {
  url: string;
  previousMessages?: ChatMessage[];
}) => {
  const sessionId = useSessionId();
  const [messages, setMessages] =
    React.useState<ChatMessage[]>(previousMessages);

  useSubscription(
    url,
    ({ body }) => {
      const message = JSON.parse(body) as ChatMessage;
      message.sendTime = new Date(message.sendTime);
      setMessages((prev) => [...prev, message]);
    },
    {
      Authorization: sessionId!,
    },
  );

  return messages;
};
