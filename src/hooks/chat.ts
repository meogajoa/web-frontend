import React from 'react';
import { useSubscription } from 'react-stomp-hooks';
import { chatMessage, ChatMessage } from '~/types/chat';
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
      const _message = JSON.parse(body);
      const { error, data: message } = chatMessage.safeParse({
        ..._message,
        sendTime: new Date(_message.sendTime),
      });

      if (error) {
        throw new Error(error.message);
      }

      setMessages((prev) => [...prev, message]);
    },
    {
      Authorization: sessionId || '',
    },
  );

  return messages;
};
