import React from 'react';
import { cn } from '~/utils/classname';

type Props = {
  className?: React.ComponentProps<'div'>['className'];
};

const GameMessages: React.FC<Props> = ({ className }) => {
  return <div className={cn('space-y-3 overflow-y-auto', className)}></div>;
};

export default GameMessages;
