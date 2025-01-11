import React from 'react';
import { cn } from '~/utils/classname';

type Props = {
  className?: React.ComponentProps<'div'>['className'];
};

// TODO: Use headlessui's Listbox component
const DropdownMenu: React.FC<React.PropsWithChildren<Props>> = ({
  className,
  children,
}) => {
  return (
    <div
      className={cn(
        'inline-block w-[9.375rem] rounded-lg bg-white p-4 text-base drop-shadow-lg',
        className,
      )}
    >
      {children}
    </div>
  );
};

export default DropdownMenu;
