import TeamNoticeItem, {
  type Props as TeamNoticeItemProps,
} from '@/components/GameResultNotice/TeamNoticeItem';
import VoteNoticeItem, {
  type Props as VoteNoticeItemProps,
} from '@/components/GameResultNotice/VoteNoticeItem';
import { cn } from '@/utils/classname';
import React from 'react';
import NoticeItem, { type Props as NoticeItemProps } from './NoticeItem';

export type GameResultNoticeProps = {
  className?: string;
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
