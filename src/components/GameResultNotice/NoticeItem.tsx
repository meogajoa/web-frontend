import React from 'react';
import BaseNoticeItem from './BaseNoticeItem';

type NoticeItemProps = {
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
        <>
          <div className="px-2 text-center">{rank}등</div>
          <div className="px-2">{nickname}</div>
          <div className="px-2">{score}</div>
          <div className="px-2">{calculation}</div>
        </>
      }
      rightContent={<div className="px-2">{prize}</div>}
    />
  );
};

export default NoticeItem;
