import React from 'react';
import BaseNoticeItem from './BaseNoticeItem';

type TeamNoticeItemProps = {
  rank: number;
  teamName: string;
  numberIcons: string[];
  prize: string;
  variant?: 'default' | 'dark';
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
      variant="dark"
      leftContent={
        <div className="flex items-center">
          <div className="mr-2 pr-2">{rank}등</div>
          <div className="mr-2 px-2">{teamName}팀</div>
          <div className="flex gap-1">
            {numberIcons.map((icon, index) => (
              <img
                key={index}
                src={icon}
                alt={`number-icon-${index}`}
                className="size-2.5"
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
