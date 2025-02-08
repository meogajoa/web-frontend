import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';
import React from 'react';
import { useRoom } from '~/hooks/room';
import { useGame } from '~/providers/GameProvider';
import CartFillIcon from '~/svgs/CartFillIcon';
import ChatIcon from '~/svgs/ChatIcon';
import { GameTime } from '~/types/game';
import { cn } from '~/utils/classname';

type Props = {
  className?: string;
};

const RoomHeaderGame = React.memo<Props>(({ className }) => {
  const t = useTranslations('roomRoute');
  const { nthDay, time } = useGame();
  const { currentChatRoom } = useRoom();

  const timeLabel =
    time === GameTime.Morning
      ? t('header.morning')
      : time === GameTime.Night
        ? t('header.night')
        : 'Invalid Time';

  return (
    <header
      className={cn(
        'bg-gray-3 relative flex h-[5.5rem] items-center justify-between px-4',
        className,
      )}
    >
      <div className="z-10 flex items-center gap-x-2">
        <p className="text-2xl font-semibold">
          {`${nthDay}${t('header.nth')} ${timeLabel}`}
        </p>

        <p className="text-sm">
          {t(`chatRoomType.${currentChatRoom}`, { username: 'jeheecheon' })}
        </p>
      </div>

      <div className="z-10 flex items-center gap-x-6">
        <span className="text-lg font-bold">₩10</span>

        <button>
          <CartFillIcon className="fill-gray-1 size-6" />
        </button>

        <button>
          <ChatIcon className="fill-gray-1 size-6" />
        </button>
      </div>

      <BottomShadow />

      <div className="bg-gray-3 absolute bottom-0 left-1/2 z-50 flex -translate-x-1/2 translate-y-1/2 gap-x-1 rounded-full p-1">
        <button
          className="bg-gray-3 rounded-full drop-shadow-lg"
          onClick={handleMinusClick}
        >
          <MinusIcon className="fill-gray-1 size-6" />
        </button>

        <span className="bg-gray-1 flex h-5.5 w-16 items-center justify-center rounded-full text-sm text-white">
          00:20
        </span>

        <button
          className={`bg-gray-3 rounded-full drop-shadow-lg`}
          onClick={handlePlusClick}
        >
          <PlusIcon className="fill-gray-1 size-6" />
        </button>
      </div>
    </header>
  );

  function handleMinusClick() {
    console.log('minus');
  }

  function handlePlusClick() {
    console.log('plus');
  }
});
RoomHeaderGame.displayName = 'RoomHeaderGame';

const BottomShadow: React.FC = () => (
  <div
    className="pointer-events-none absolute inset-0 size-full bg-inherit drop-shadow-lg"
    aria-hidden
  />
);

export default RoomHeaderGame;
