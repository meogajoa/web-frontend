import { Button } from '@headlessui/react';
import React from 'react';
import LockIcon from '~/svgs/LockIcon';
import { cn } from '~/utils/classname';

type Props = {
  className?: string;
  total?: number;
  current: number;
  title: string;
  isPrivate: boolean;
  description: string;
};

const Room: React.FC<Props> = ({
  className,
  total = 8,
  current,
  title,
  isPrivate,
  description,
}) => {
  return (
    <Button
      className={cn(
        'flex h-14 items-center rounded-[0.625rem] bg-gray-6 p-4 transition-all data-[hover]:ring data-[hover]:ring-gray-5',
        className,
      )}
    >
      <p className="text-2xl">{title}</p>
      <p className="ml-2 text-sm">{description}</p>
      <LockIcon
        className={cn(
          'invisible ml-auto size-4 fill-black',
          isPrivate && 'visible',
        )}
      />
      <p className="ml-2 text-2xl">
        {current}/{total}
      </p>
    </Button>
  );
};

export default Room;
