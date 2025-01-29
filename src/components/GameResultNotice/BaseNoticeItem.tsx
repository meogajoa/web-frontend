import React from 'react';
import { cn } from '~/utils/classname';

type BaseNoticeItemProps = {
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
  className?: string;
  variant?: 'default' | 'dark';
};

const BaseNoticeItem: React.FC<BaseNoticeItemProps> = ({
  leftContent,
  rightContent,
  className,
  variant = 'default',
}) => {
  return (
    <div
      className={cn(
        'flex h-6 w-full items-center justify-between rounded px-2 py-1 font-brand text-sm text-white',
        variant === 'dark' ? 'bg-gray-2' : 'bg-gray-4',
        className,
      )}
    >
      <div className="flex gap-2">{leftContent}</div>
      <div className="text-right">{rightContent}</div>
    </div>
  );
};

export default BaseNoticeItem;
