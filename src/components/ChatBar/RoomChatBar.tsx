import { noop } from 'lodash-es';
import { useParams } from 'next/navigation';
import React from 'react';
import { useStompClient } from 'react-stomp-hooks';
import { ChatBar } from '~/components/ChatBar';
import { TextareaHandle } from '~/components/CustomTextarea';
import { useSessionId } from '~/hooks/account';
import { cn } from '~/utils/classname';

type Props = {
  className?: string;
  renderPlaceholder?: boolean;
};

const RoomChatBar = React.memo<Props>(({ className, renderPlaceholder }) => {
  const textareaRef = React.useRef<TextareaHandle>(null);
  const stompClient = useStompClient();
  const { id } = useParams<{ id: string }>();
  const sessionId = useSessionId();

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
      destination: `/app/room/${id}/chat`,
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
});
RoomChatBar.displayName = 'RoomChatBar';

export default RoomChatBar;
