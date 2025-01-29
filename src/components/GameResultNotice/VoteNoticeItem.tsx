import Image from 'next/image';
import React from 'react';
import { ProfileImage } from '~/components/ProfileImage';
import { cn } from '~/utils/classname';
import BaseNoticeItem from './BaseNoticeItem';
import { VoteNoticeItemProps } from './types';

const VoteNoticeItem: React.FC<VoteNoticeItemProps> = ({
  nickname,
  voteIcon,
  profileColor = 'gray',
  votes,
  className,
}) => {
  return (
    <BaseNoticeItem
      variant="dark"
      className={cn('h-7', className)}
      leftContent={
        <div className="flex items-center">
          <ProfileImage size="sm" color={profileColor} />
          <div className="ml-1.5 mr-2 flex items-center px-2">{nickname}</div>
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
      rightContent={<div className="flex items-center gap-2">{votes}</div>}
    />
  );
};

export default VoteNoticeItem;
