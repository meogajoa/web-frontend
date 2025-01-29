import { Button as HeadlessuiButton } from '@headlessui/react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { AxiosError } from 'axios';
import { useParams } from 'next/navigation';
import React from 'react';
import { Button } from '~/components/Button';
import { useStartGameMutation } from '~/hooks/game';
import { useRoomUsersSubscription } from '~/hooks/room';
import { useRouter } from '~/i18n/routing';
import { cn } from '~/utils/classname';

type Props = {
  className?: React.ComponentProps<'div'>['className'];
  title: string;
};

const RoomHeaderWaiting: React.FC<Props> = ({ className, title }) => {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const { users } = useRoomUsersSubscription({ variables: { id } });
  const { startGame, isPending } = useStartGameMutation({
    onSuccess: handleGameStartSuccess,
    onError: handleGameStartError,
  });

  return (
    <header
      className={cn(
        'relative flex h-[5.5rem] items-center bg-gray-3 px-4',
        className,
      )}
    >
      <HeadlessuiButton onClick={handleBackClick}>
        <ArrowLeftIcon className="size-6 fill-gray-1" />
      </HeadlessuiButton>

      <h2 className="ml-2">{title}</h2>

      <Button
        className="ml-auto px-4"
        variant="primary"
        rounded="full"
        size="sm"
        disabled={users.length <= 7}
        loading={isPending}
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
    if (users.length <= 7) {
      return;
    }

    startGame({ id });
  }

  function handleGameStartSuccess() {
    console.log('Game started');
  }

  function handleGameStartError(error: AxiosError<void>) {
    console.error(error);
  }
};

export default RoomHeaderWaiting;
