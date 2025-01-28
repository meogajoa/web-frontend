import { Button as HeadlessuiButton } from '@headlessui/react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { Button } from '~/components/Button';
import { useRouter } from '~/i18n/routing';
import { cn } from '~/utils/classname';

type Props = {
  className?: React.ComponentProps<'div'>['className'];
  title: string;
};

const RoomHeaderWaiting: React.FC<Props> = ({ className, title }) => {
  const router = useRouter();

  return (
    <header
      className={cn(
        'relative flex h-[5.5rem] items-center justify-between bg-gray-3 px-4',
        className,
      )}
    >
      <HeadlessuiButton onClick={handleBackClick}>
        <ArrowLeftIcon className="size-6 fill-gray-1" />
      </HeadlessuiButton>

      <h2>{title}</h2>

      <Button
        className="px-4"
        variant="primary"
        rounded="full"
        size="sm"
        onClick={handleGameStart}
      >
        게임 시작
      </Button>
    </header>
  );

  function handleBackClick() {
    router.back();
  }

  function handleGameStart() {
    // TODO: Implement game start feature
  }
};

export default RoomHeaderWaiting;
