import React from 'react';
import { cn } from '~/utils/classname';

export type ChatTextProps = {
  className?: string;
  title: string;
  content: string;
  isSpy?: boolean;
  isAccessable?: boolean;
};

const ChatText: React.FC<ChatTextProps> = ({
  className,
  title,
  content,
  isSpy,
  isAccessable = false,
}) => {
  return (
    <div
      className={cn('space-y-2.5 text-base font-medium text-white', className)}
    >
      <div className="text-left">
        <span>{title}</span>
        {isSpy && <span className="text-red font-normal">{' (스파이)'}</span>}
      </div>
      <div
        className={cn(
          'w-fit text-[0.625rem]',
          isAccessable ? 'text-red' : 'text-gray-5',
        )}
      >
        {content}
      </div>
    </div>
  );
};

export default ChatText;
