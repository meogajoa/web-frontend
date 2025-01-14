import React from 'react';
import { Link } from '~/i18n/routing';
import LockIcon from '~/svgs/LockIcon';
import { cn } from '~/utils/classname';

type Props = {
  className?: string;
  id: string;
  title: string;
  description: string;
  total: number;
  current: number;
  isPrivate: boolean;
};

const Room: React.FC<Props> = ({
  className,
  id,
  title,
  description,
  total = 8,
  current,
  isPrivate,
}) => {
  return (
    <Link
      className={cn(
        'flex h-14 items-center rounded-[0.625rem] bg-gray-6 p-4 transition-all data-[hover]:ring data-[hover]:ring-gray-5',
        className,
      )}
      href={`/rooms/${id}`}
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
    </Link>
  );
};

export default Room;
