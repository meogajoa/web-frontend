import React from 'react';
import BaseNoticeItem from './BaseNoticeItem';
import { NoticeItemProps } from './NoticeItem';
import TeamNoticeItem, { TeamNoticeItemProps } from './TeamNoticeItem';
import VoteNoticeItem, { VoteNoticeItemProps } from './VoteNoticeItem';

type ResultData =
  | {
      type: 'game';
      data: NoticeItemProps[];
    }
  | {
      type: 'vote';
      data: VoteNoticeItemProps[];
    }
  | {
      type: 'team';
      data: TeamNoticeItemProps[];
    };

type GameResultNoticeProps = {
  result: ResultData;
  type: string;
  gameNotice?: Omit<NoticeItemProps, 'className'>;
  voteNotice?: Omit<VoteNoticeItemProps, 'className'>;
  teamNotice?: Omit<TeamNoticeItemProps, 'className'>;
};

const GameResultNotice: React.FC<GameResultNoticeProps> = ({ result }) => {
  if (result.type === 'game') {
    return (
      <div className="space-y-1">
        {result.data.map((item, index) => (
          <BaseNoticeItem
            key={index}
            leftContent={
              <div className="flex items-center justify-center gap-x-4 px-2">
                <div>{item.rank}등</div>
                <div>{item.nickname}</div>
                <div>{item.score}</div>
                <div>{item.calculation}</div>
              </div>
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
  } else {
    return null;
  }
};

export default GameResultNotice;
