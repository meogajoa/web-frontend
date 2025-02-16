import { ChatBar } from '@/components/ChatBar';
import { type TextareaHandle } from '@/components/CustomTextarea';
import useSessionId from '@/hooks/account/useSessionId';
import { useRoom } from '@/providers/RoomProvider';
import { ChatRoom } from '@/types/chat';
import { assert } from '@/utils/assert';
import { cn } from '@/utils/classname';
import { noop } from 'lodash-es';
import React from 'react';
import { useStompClient } from 'react-stomp-hooks';

type Props = {
  className?: string;
  renderPlaceholder?: boolean;
};

const RoomChatBar = React.memo<Props>(({ className, renderPlaceholder }) => {
  const textareaRef = React.useRef<TextareaHandle>(null);
  const stompClient = useStompClient('meogajoa');
  const sessionId = useSessionId();
  const { id, currentChatRoom } = useRoom();

  return (
    <>
      {renderPlaceholder && (
        <div className="h-[3.813rem] shrink-0" aria-hidden />
      )}

      <ChatBar className={cn('', className)}>
        <ChatBar.MenuButton onMenuClick={noop} />
        <ChatBar.Textarea ref={textareaRef} onKeyDown={handleSubmitShortcut} />
        <ChatBar.SendButton onSendClick={handleSend} />
      </ChatBar>
    </>
  );

  function handleSend() {
    if (!textareaRef.current) {
      return;
    }

    const message = textareaRef.current.getValue();
    textareaRef.current.blur();
    textareaRef.current?.focus();
    setTimeout(() => {
      textareaRef.current?.clear();
    }, 0);

    stompClient?.publish({
      headers: {
        Authorization: sessionId,
      },
      destination: getMessageDestination(currentChatRoom),
      body: JSON.stringify({ type: 'CHAT', content: message }),
    });
  }

  function handleSubmitShortcut(
    event: React.KeyboardEvent<HTMLTextAreaElement>,
  ) {
    if (
      (event.key === 'Enter' && event.metaKey) ||
      (event.key === 'Enter' && event.ctrlKey)
    ) {
      event.preventDefault();
      handleSend();
    }
  }

  function getMessageDestination(chatRoom: ChatRoom) {
    switch (chatRoom) {
      case ChatRoom.Black:
        return `/app/game/${id}/chat/black`;
      case ChatRoom.White:
        return `/app/game/${id}/chat/white`;
      case ChatRoom.Red:
        return `/app/game/${id}/chat/red`;
      case ChatRoom.Eliminated:
        return `/app/game/${id}/chat/eliminated`;
      case ChatRoom.General:
        return `/app/game/${id}/chat`;
      case ChatRoom.Lobby:
        return `/app/room/${id}/chat`;
      default:
        const number = Number(chatRoom);
        assert(number >= 1 && number <= 8, `Invalid chat room: ${chatRoom}`);
        return `/app/game/${id}/user/${chatRoom}/chat`;
    }
  }
});
RoomChatBar.displayName = 'RoomChatBar';

export default RoomChatBar;
