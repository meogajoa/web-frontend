import React from 'react';
import NumberIconBall from '../NumberIconBall';
import BaseNoticeItem from './BaseNoticeItem';

export type TeamNoticeItemProps = {
  rank: number;
  teamName: string;
  numberIcons: { number: number; team: '흑' | '백' }[]; // numberIcons 타입 수정
  variant?: 'default' | 'dark';
  prize: string;
};

const TeamNoticeItem: React.FC<TeamNoticeItemProps> = ({
  rank,
  teamName,
  numberIcons,
  variant,
  prize,
}) => {
  return (
    <BaseNoticeItem
      variant={variant || 'default'}
      leftContent={
        <div className="flex items-center">
          <div className="mr-4 pr-2">{rank}등</div>
          <div className="mr-2 px-2">{teamName}팀</div>
          <div className="flex gap-1">
            {numberIcons.map((icon, index) => (
              <NumberIconBall
                key={index}
                number={icon.number}
                team={icon.team}
              />
            ))}
          </div>
        </div>
      }
      rightContent={
        <div className="flex items-center">
          <div className="text-right text-white">{prize}</div>
        </div>
      }
    />
  );
};

export default TeamNoticeItem;
