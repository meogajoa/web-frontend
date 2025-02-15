import { type Team } from '@/types/game';
import { cn } from '@/utils/classname';
import React from 'react';

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
        'font-brand flex size-4 items-center justify-center rounded-full text-[0.5rem] font-bold text-white',
        color === 'BLACK' ? 'bg-gray-1' : 'bg-gray-5',
        className,
      )}
    >
      {number}
    </div>
  );
};

export default NumberIconBall;
