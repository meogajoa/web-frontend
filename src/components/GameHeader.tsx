import { Button as HeadlessuiButton } from '@headlessui/react';
import { useTranslations } from 'next-intl';
import React from 'react';
import CartFillIcon from '~/svgs/CartFillIcon';
import ChatIcon from '~/svgs/ChatIcon';
import { type ChatRoomKind } from '~/types/game';
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
        'flex h-[5.5rem] items-center justify-between bg-gray-3 drop-shadow-lg',
        className,
      )}
    >
      <div className="flex items-center gap-x-2">
        <p className="text-2xl font-semibold">
          {`${nthRound}${t('header.nth')} ${isMorning ? t('header.morning') : t('header.night')}`}
        </p>

        <p className="text-sm">
          {t(`chatRoomType.${whichChatRoom}`, { username: 'jeheecheon' })}
        </p>
      </div>

      <div className="flex items-center gap-x-6">
        <span className="text-lg font-bold">₩10</span>

        <HeadlessuiButton>
          <CartFillIcon className="size-6 fill-gray-1" />
        </HeadlessuiButton>

        <HeadlessuiButton>
          <ChatIcon className="size-6 fill-gray-1" />
        </HeadlessuiButton>
      </div>
    </header>
  );
};

export default GameHeader;
