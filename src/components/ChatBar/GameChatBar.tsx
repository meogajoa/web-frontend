import { noop } from 'lodash-es';
import React from 'react';
import { ChatBar } from '~/components/ChatBar';
import { TextareaHandle } from '~/components/CustomTextarea';
import { cn } from '~/utils/classname';

type Props = {
  className?: React.ComponentProps<'div'>['className'];
};

const GameChatBar: React.FC<Props> = ({ className }) => {
  const textareaRef = React.useRef<TextareaHandle>(null);

  return (
    <>
      {/* Placeholder */}
      <div className="h-[3.813rem] shrink-0" aria-hidden />

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
    console.log(message);
    textareaRef.current.clear();
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
};

export default GameChatBar;
