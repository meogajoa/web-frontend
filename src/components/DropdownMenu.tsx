import React from 'react';
import { cn } from '~/utils/classname';

type Props = Readonly<React.ComponentProps<'div'>>;

const DropdownMenu: React.FC<Props> = ({ className, ...props }) => {
  return (
    <div
      className={cn(
        'inline-block w-[9.375rem] rounded-lg bg-white p-4 text-base drop-shadow-lg',
        className,
      )}
      {...props}
    />
  );
};

export default DropdownMenu;
