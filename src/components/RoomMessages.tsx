import { ChatMessage } from '@/components/ChatMessage';
import useChatMessages from '@/hooks/chat/useMessages';
import { useAccount } from '@/providers/AccountProvider';
import { useGame } from '@/providers/GameProvider';
import { useRoom } from '@/providers/RoomProvider';
import { type ChatMessage as ChatMessageType } from '@/types/chat';
import { cn } from '@/utils/classname';
import { convertUserNumber } from '@/utils/game';
import { useTranslations } from 'next-intl';
import React from 'react';

type Props = {
  className?: string;
};

const RoomMessages = React.memo<Props>(({ className }) => {
  const containerRef = React.useRef<HTMLUListElement>(null);
  const bottomRef = React.useRef<HTMLLIElement>(null);

  const t = useTranslations('roomRoute.chatMessage');
  const { currentChatRoom } = useRoom();
  const { account } = useAccount();
  const { user, otherUsers } = useGame();

  const messages = useChatMessages({
    variables: { chatRoom: currentChatRoom },
    onNewMessage: scrollToBottom,
  });

  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentChatRoom]);

  return (
    <ul
      className={cn('space-y-3 overflow-y-auto p-4 font-bold', className)}
      ref={containerRef}
    >
      {messages.map(({ id, content, sender }) => {
        const isSelf =
          sender === account.nickname || sender === user.number.toString();
        const username = isSelf
          ? sender
          : t('inGameUsername', { username: sender });

        const userNumber = convertUserNumber(sender);

        return (
          <ChatMessage
            key={id}
            position={isSelf ? 'right' : 'left'}
            username={username}
            message={content}
            color={otherUsers[userNumber]?.team}
          />
        );
      })}

      <li ref={bottomRef} aria-hidden />
    </ul>
  );

  // scroll to bottom when new message is sent
  // when user has scrolled up to see previous messages, don't scroll to bottom
  function scrollToBottom(message: ChatMessageType) {
    if (!containerRef.current) {
      return;
    }

    const EPSILON = 100;
    const { scrollTop, scrollHeight, clientHeight } = containerRef.current;
    const isScrolledToBottom =
      scrollTop + clientHeight >= scrollHeight - EPSILON;

    if (!isScrolledToBottom && message.sender !== account.nickname) {
      return;
    }

    setTimeout(
      () => bottomRef.current?.scrollIntoView({ behavior: 'smooth' }),
      0,
    );
  }
});
RoomMessages.displayName = 'RoomMessages';

export default RoomMessages;
