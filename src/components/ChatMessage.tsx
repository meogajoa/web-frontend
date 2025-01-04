import React from 'react';
import { cn } from '~/utils/classname';

type Props = Readonly<React.ComponentProps<'div'>>;

const ChatMessage: React.FC<Props> = ({ className }) => {
  return <div className={cn('', className)}></div>;
};

export default ChatMessage;
