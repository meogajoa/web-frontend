import React from 'react';
import { cn } from '~/utils/classname';
import NoticeItem, { NoticeItemProps } from './NoticeItem';
import TeamNoticeItem, { TeamNoticeItemProps } from './TeamNoticeItem';
import VoteNoticeItem, { VoteNoticeItemProps } from './VoteNoticeItem';

export type GameResultNoticeProps = {
  className?: React.ComponentProps<'div'>['className'];
  resultType: 'game' | 'vote' | 'team';
  noticeItemData?: NoticeItemProps[];
  voteNoticeItemData?: VoteNoticeItemProps[];
  teamNoticeItemData?: TeamNoticeItemProps[];
};

const GameResultNotice: React.FC<GameResultNoticeProps> = ({
  className,
  resultType,
  noticeItemData,
  voteNoticeItemData,
  teamNoticeItemData,
}) => {
  return (
    <div className={cn('space-y-1', className)}>
      {noticeItemData &&
        resultType === 'game' &&
        noticeItemData.map((item, index) => (
          <NoticeItem key={index} {...item} />
        ))}

      {voteNoticeItemData &&
        resultType === 'vote' &&
        voteNoticeItemData.map((item, index) => (
          <VoteNoticeItem key={index} {...item} />
        ))}

      {teamNoticeItemData &&
        resultType === 'team' &&
        teamNoticeItemData.map((item, index) => (
          <TeamNoticeItem key={index} {...item} />
        ))}
    </div>
  );
};

export default GameResultNotice;
