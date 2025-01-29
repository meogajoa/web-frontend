import { Button as HeadlessuiButton } from '@headlessui/react';
import { ArrowLeftIcon } from '@heroicons/react/24/outline';
import { AxiosError } from 'axios';
import { debounce } from 'lodash-es';
import { useParams } from 'next/navigation';
import React from 'react';
import { Button } from '~/components/Button';
import { useStartGameMutation } from '~/hooks/game';
import { useUsersNoticeSubscription } from '~/hooks/room';
import { useRouter } from '~/i18n/routing';
import { cn } from '~/utils/classname';

type Props = {
  className?: React.ComponentProps<'div'>['className'];
  title: string;
};

const RoomHeaderWaiting: React.FC<Props> = ({ className, title }) => {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const { users } = useUsersNoticeSubscription({ variables: { id } });
  const { startGame, isPending, isSuccess } = useStartGameMutation({
    onError: handleStartGameError,
  });

  const handleStartGameClick = React.useCallback(
    debounce(_handleStartGameClick, 500, { leading: true }),
    [users],
  );

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
        disabled={isSuccess || users.length <= 7}
        loading={isPending}
        onClick={handleStartGameClick}
      >
        게임 시작
      </Button>
    </header>
  );

  function handleBackClick() {
    router.back();
  }

  function _handleStartGameClick() {
    if (users.length <= 7) {
      return;
    }

    startGame({ id });
  }

  function handleStartGameError(error: AxiosError<void>) {
    console.error(error);
  }
};

export default RoomHeaderWaiting;
