import React from 'react';
import { cn } from '~/utils/classname';

export type NoticeIconProps = {
  className?: string;
  notice: number;
};

const NoticeIcon: React.FC<NoticeIconProps> = ({ className, notice }) => {
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
