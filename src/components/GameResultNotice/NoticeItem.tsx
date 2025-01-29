import React from 'react';
import BaseNoticeItem from './BaseNoticeItem';

export type NoticeItemProps = {
  rank: number;
  nickname: string;
  score: number;
  calculation: string;
  prize: string;
};

const NoticeItem: React.FC<NoticeItemProps> = ({
  rank,
  nickname,
  score,
  calculation,
  prize,
}) => {
  return (
    <BaseNoticeItem
      leftContent={
        <div className="flex items-center justify-center gap-x-4 px-2">
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
