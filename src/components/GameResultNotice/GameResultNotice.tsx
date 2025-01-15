import React from 'react';
import BaseNoticeItem from './BaseNoticeItem';
import TeamNoticeItem from './TeamNoticeItem';
import VoteNoticeItem from './VoteNoticeItem';

type ResultData =
  | {
      type: 'game';
      data: {
        rank: number;
        nickname: string;
        score: number;
        calculation: string;
        prize: string;
      }[];
    }
  | {
      type: 'vote';
      data: {
        teamIcon: string;
        nickname: string;
        voteIcon: string;
        votes: number;
        variant?: 'default' | 'dark';
      }[];
    }
  | {
      type: 'team';
      data: {
        rank: number;
        teamName: string;
        numberIcons: string[];
        prize: string;
      }[];
    };
type GameResultNoticeProps = {
  result: ResultData;
  type: string;
};

const GameResultNotice: React.FC<GameResultNoticeProps> = ({ result }) => {
  if (result.type === 'game') {
    return (
      <div className="space-y-1">
        {result.data.map((item, index) => (
          <BaseNoticeItem
            key={index}
            leftContent={
              <>
                <div className="px-2 text-center">{item.rank}등</div>
                <div className="px-2">{item.nickname}</div>
                <div className="px-2">{item.score}</div>
                <div className="px-2">{item.calculation}</div>
              </>
            }
            rightContent={<div className="px-2">{item.prize}</div>}
          />
        ))}
      </div>
    );
  } else if (result.type === 'vote') {
    return (
      <div className="space-y-1">
        {result.data.map((item, index) => (
          <VoteNoticeItem
            key={index}
            teamIcon={item.teamIcon}
            nickname={item.nickname}
            voteIcon={item.voteIcon}
            votes={item.votes}
            variant={item.variant}
          />
        ))}
      </div>
    );
  } else if (result.type === 'team') {
    return (
      <div className="space-y-1">
        {result.data.map((item, index) => (
          <TeamNoticeItem
            key={index}
            rank={item.rank}
            teamName={item.teamName}
            numberIcons={item.numberIcons}
            prize={item.prize}
          />
        ))}
      </div>
    );
  }
  return null;
};

export default GameResultNotice;
