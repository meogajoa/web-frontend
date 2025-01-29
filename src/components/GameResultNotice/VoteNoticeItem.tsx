import Image from 'next/image';
import React from 'react';
import BaseNoticeItem from './BaseNoticeItem';

type VoteNoticeItemProps = {
  teamIcon: string;
  nickname: string;
  voteIcon: string;
  votes: number;
  variant?: 'default' | 'dark';
};

const VoteNoticeItem: React.FC<VoteNoticeItemProps> = ({
  teamIcon,
  nickname,
  voteIcon,
  votes,
}) => {
  return (
    <BaseNoticeItem
      variant="dark"
      className="h-7"
      leftContent={
        <div className="flex items-center">
          <img src={teamIcon} alt="team-icon" className="size-5 rounded-md" />
          <div className="ml-1.5 mr-2 flex items-center px-2">{nickname}</div>
          {/* 투표 아이콘을 투표 수만큼 렌더링 */}
          <div className="flex gap-1">
            {Array.from({ length: votes }).map((_, iconIndex) => (
              <Image
                key={iconIndex}
                src={voteIcon}
                alt={`vote-icon-${iconIndex}`}
                width={10}
                height={10}
              />
            ))}
          </div>
        </div>
      }
      rightContent={
        <div className="flex items-center gap-2">
          {/* 총 투표 수 */}
          <div>{votes}</div>
        </div>
      }
    />
  );
};

export default VoteNoticeItem;
