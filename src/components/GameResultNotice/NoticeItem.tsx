import React from 'react';
import { cn } from '~/utils/classname';
import BaseNoticeItem from './BaseNoticeItem';
import { NoticeItemProps } from './types';

const NoticeItem: React.FC<NoticeItemProps> = ({
  rank,
  nickname,
  score,
  calculation,
  prize,
  className,
}) => {
  return (
    <BaseNoticeItem
      className={cn('flex items-center justify-between px-4 py-2', className)}
      leftContent={
        <div className="flex items-center gap-x-4">
          <div>{rank}등</div>
          <div>{nickname}</div>
          <div>{score}</div>
          <div>{calculation}</div>
        </div>
      }
      rightContent={<div className="px-2">{prize}</div>}
    />
  );
};

export default NoticeItem;
