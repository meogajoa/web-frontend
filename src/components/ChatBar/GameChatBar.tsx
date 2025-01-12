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
      <div className="h-[3.813rem]" aria-hidden />

      <ChatBar className={cn('', className)}>
        <ChatBar.MenuButton onMenuClick={() => {}} />
        <ChatBar.Textarea ref={textareaRef} />
        <ChatBar.SendButton onSendClick={() => {}} />
      </ChatBar>
    </>
  );
};

export default GameChatBar;
