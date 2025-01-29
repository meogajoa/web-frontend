import React from 'react';
import { cn } from '~/utils/classname';

export type NumberIconBallProps = {
  number: number;
  team: '흑' | '백';
  className?: string;
};

const NumberIconBall: React.FC<NumberIconBallProps> = ({
  number,
  team,
  className,
  ...props
}) => {
  return (
    <div
      className={cn(
        'flex size-4 items-center justify-center rounded-full font-brand text-[0.5rem] font-bold text-white',
        team === '흑' ? 'bg-gray-1' : 'bg-gray-5',
        className,
      )}
      {...props}
    >
      {number}
    </div>
  );
};

export default NumberIconBall;
