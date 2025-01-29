import React from 'react';
import NoticeItem from './NoticeItem';
import TeamNoticeItem from './TeamNoticeItem';
import { ResultData } from './types';
import VoteNoticeItem from './VoteNoticeItem';

export type GameResultNoticeProps = {
  result: ResultData;
  resultType?: 'game' | 'vote' | 'team'; // ✅ 추가
};

const GameResultNotice: React.FC<GameResultNoticeProps> = ({ result }) => {
  switch (result.type) {
    case 'game':
      return (
        <div className="space-y-1">
          {result.data.map((item, index) => (
            <NoticeItem key={index} {...item} />
          ))}
        </div>
      );
    case 'vote':
      return (
        <div className="space-y-1">
          {result.data.map((item, index) => (
            <VoteNoticeItem key={index} {...item} />
          ))}
        </div>
      );
    case 'team':
      return (
        <div className="space-y-1">
          {result.data.map((item, index) => (
            <TeamNoticeItem key={index} {...item} />
          ))}
        </div>
      );
    default:
      return null;
  }
};

export default GameResultNotice;
