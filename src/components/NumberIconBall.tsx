import React from 'react';
import { Team } from '~/types/game';
import { cn } from '~/utils/classname';

export type NumberIconBallProps = {
  number: number;
  color: Team;
  className?: string;
};

const NumberIconBall: React.FC<NumberIconBallProps> = ({
  number,
  color,
  className,
}) => {
  return (
    <div
      className={cn(
        'flex size-4 items-center justify-center rounded-full font-brand text-[0.5rem] font-bold text-white',
        color === 'black' ? 'bg-gray-1' : 'bg-gray-5',
        className,
      )}
    >
      {number}
    </div>
  );
};

export default NumberIconBall;
