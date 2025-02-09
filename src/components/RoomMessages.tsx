import { useTranslations } from 'next-intl';
import React from 'react';
import { ChatMessage } from '~/components/ChatMessage';
import { useChatMessages } from '~/hooks/chat';
import { useAccount } from '~/providers/AccountProvider';
import { useGame } from '~/providers/GameProvider';
import { useRoom } from '~/providers/RoomProvider';
import { ChatMessage as ChatMessageType } from '~/types/chat';
import { Team, UserNumber } from '~/types/game';
import { cn } from '~/utils/classname';

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
      {messages.map(({ id, content, sender: _sender }) => {
        const isSelf =
          _sender === account.nickname || _sender === user.number.toString();
        const sender = isSelf
          ? _sender
          : t('inGameUsername', { username: _sender });
        const isBlack =
          otherUsers[_sender as unknown as UserNumber]?.team === Team.Black;

        return (
          <ChatMessage
            key={id}
            position={isSelf ? 'right' : 'left'}
            username={sender}
            message={content}
            color={isBlack ? 'gray' : 'light-gray'}
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
