import React from 'react';
import { cn } from '~/utils/classname';
import NumberIconBall from '../NumberIconBall';
import BaseNoticeItem from './BaseNoticeItem';
import { TeamNoticeItemProps } from './types';

const TeamNoticeItem: React.FC<TeamNoticeItemProps> = ({
  rank,
  teamName,
  numberIcons,
  variant = 'default',
  prize,
  className,
}) => {
  return (
    <BaseNoticeItem
      variant={variant}
      className={cn('', className)}
      leftContent={
        <div className="flex items-center">
          <div className="mr-4 pr-2">{rank}등</div>
          <div className="mr-2 px-2">{teamName}팀</div>
          <div className="flex gap-1">
            {numberIcons.map(({ number, team }, index) => (
              <NumberIconBall key={index} number={number} team={team} />
            ))}
          </div>
        </div>
      }
      rightContent={<div className="text-right text-white">{prize}</div>}
    />
  );
};

export default TeamNoticeItem;
