import React from 'react';
import { cn } from '~/utils/classname';

export type NoticeIconProps = {
  notice: number;
  className?: string;
};

const NoticeIcon: React.FC<NoticeIconProps> = ({ notice, className }) => {
  return (
    <div
      className={cn(
        'font-brand bg-red flex size-4 items-center justify-center rounded-full text-[0.5rem] font-bold text-white',
        className,
      )}
    >
      {notice}
    </div>
  );
};

export default NoticeIcon;
