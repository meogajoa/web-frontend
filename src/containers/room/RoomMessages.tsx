import { ChatMessage as ChatMessageComponent } from '@/components/ChatMessage';
import { SystemNotice } from '@/components/Notice';
import useChatMessages from '@/hooks/chat/useMessages';
import { useAccount } from '@/providers/AccountProvider';
import { useGame } from '@/providers/GameProvider';
import { useRoom } from '@/providers/RoomProvider';
import { type ChatMessage, ChatMessageType } from '@/types/chat';
import { cn } from '@/utils/classname';
import { convertToPlayerNumber } from '@/utils/game';
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
  const { player, otherPlayers } = useGame();

  const messages = useChatMessages({
    variables: { chatRoom: currentChatRoom },
    onNewMessage: scrollToBottom,
  });

  React.useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [currentChatRoom]);

  return (
    <ul
      className={cn('space-y-3 overflow-y-auto px-4 py-5 font-bold', className)}
      ref={containerRef}
    >
      {messages.map(({ id, content, sender, type }) => {
        const isSelf =
          sender === account.nickname || sender === player.number.toString();
        const username = isSelf
          ? sender
          : t('inGameUsername', { username: sender });

        const playerNumber = convertToPlayerNumber(sender);

        switch (type) {
          case ChatMessageType.Chat: {
            return (
              <ChatMessageComponent
                key={id}
                position={isSelf ? 'right' : 'left'}
                username={username}
                message={content}
                color={otherPlayers[playerNumber]?.team}
              />
            );
          }
          case ChatMessageType.System: {
            return (
              <SystemNotice className="mx-auto" key={id} message={content} />
            );
          }
        }
      })}

      <li ref={bottomRef} aria-hidden />
    </ul>
  );

  // scroll to bottom when new message is sent
  // when user has scrolled up to see previous messages, don't scroll to bottom
  function scrollToBottom(message: ChatMessage) {
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
