import { Button as HeadlessuiButton } from '@headlessui/react';
import { MinusIcon, PlusIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';
import React from 'react';
import CartFillIcon from '~/svgs/CartFillIcon';
import ChatIcon from '~/svgs/ChatIcon';
import type { ChatRoomKind } from '~/types/chat';
import { cn } from '~/utils/classname';

type Props = {
  className?: React.ComponentProps<'header'>['className'];
  nthRound: number;
  isMorning: boolean;
  whichChatRoom: ChatRoomKind;
};

const GameHeader: React.FC<Props> = ({
  className,
  nthRound,
  isMorning,
  whichChatRoom,
}) => {
  const t = useTranslations('roomRoute');

  return (
    <header
      className={cn(
        'relative flex h-[5.5rem] items-center justify-between bg-gray-3 px-4',
        className,
      )}
    >
      <div className="z-10 flex items-center gap-x-2">
        <p className="text-2xl font-semibold">
          {`${nthRound}${t('header.nth')} ${isMorning ? t('header.morning') : t('header.night')}`}
        </p>

        <p className="text-sm">
          {t(`chatRoomType.${whichChatRoom}`, { username: 'jeheecheon' })}
        </p>
      </div>

      <div className="z-10 flex items-center gap-x-6">
        <span className="text-lg font-bold">₩10</span>

        <HeadlessuiButton>
          <CartFillIcon className="size-6 fill-gray-1" />
        </HeadlessuiButton>

        <HeadlessuiButton>
          <ChatIcon className="size-6 fill-gray-1" />
        </HeadlessuiButton>
      </div>

      <BottomShadow />

      <div className="absolute bottom-0 left-1/2 z-50 flex -translate-x-1/2 translate-y-1/2 gap-x-1 rounded-full bg-gray-3 p-1">
        <HeadlessuiButton
          className="rounded-full bg-gray-3 drop-shadow-lg"
          onClick={handleMinusClick}
        >
          <MinusIcon className="size-6 fill-gray-1" />
        </HeadlessuiButton>

        <span className="flex h-5.5 w-16 items-center justify-center rounded-full bg-gray-1 text-sm text-white">
          00:20
        </span>

        <HeadlessuiButton
          className={`rounded-full bg-gray-3 drop-shadow-lg`}
          onClick={handlePlusClick}
        >
          <PlusIcon className="size-6 fill-gray-1" />
        </HeadlessuiButton>
      </div>
    </header>
  );

  function handleMinusClick() {
    console.log('minus');
  }

  function handlePlusClick() {
    console.log('plus');
  }
};

const BottomShadow: React.FC = () => (
  <div
    className="pointer-events-none absolute inset-0 size-full bg-inherit drop-shadow-lg"
    aria-hidden
  />
);

export default GameHeader;
