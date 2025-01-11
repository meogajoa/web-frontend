'use client';

import { Button as HeadlessuiButton } from '@headlessui/react';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { useTranslations } from 'next-intl';
import React from 'react';
import CreateRoomModal from '~/components/BrandModal/CreateRoomModal';
import { Button } from '~/components/Button';
import DropdownMenu from '~/components/DropdownMenu';
import { Room } from '~/components/Room';
import Tooltip from '~/components/Tooltip';
import { cn } from '~/utils/classname';

const HomePage = () => {
  const messages = useTranslations('homeRoute');
  const [isRotating, setIsRotating] = React.useState(false);
  const [isCreateRoomModalVisible, setIsCreateRoomModalVisible] =
    React.useState(false);

  return (
    <>
      {/* Placeholder for the fixed header below */}
      <div className="h-[9.75rem]" aria-hidden />

      <header className="fixed inset-0 z-10 h-fit bg-white">
        <div className="flex h-[5.5rem] items-center justify-between px-4">
          <h1 className="text-3xl font-semibold">{messages('header.title')}</h1>
          <HeadlessuiButton
            className={cn(
              'size-6 stroke-black',
              isRotating &&
                'rotate-[360deg] transition-transform duration-1000',
            )}
            as={ArrowPathIcon}
            onClick={handleRefreshClick(true)}
            onTransitionEnd={handleRefreshClick(false)}
          />
        </div>

        <div className="flex gap-x-4 p-4 shadow-bottom">
          <Tooltip
            contents={<DropdownMenuList />}
            clickable
            clickToOpen
            offset={20}
            place="bottom-start"
          >
            <Button size="sm" rounded="full" icon="chevron-down">
              {messages('header.categoryButton')}
            </Button>
          </Tooltip>

          <Tooltip
            contents={<DropdownMenuList />}
            clickable
            clickToOpen
            offset={20}
            place="bottom-start"
          >
            <Button size="sm" rounded="full" icon="chevron-down">
              {messages('header.roomVisibilityButton')}
            </Button>
          </Tooltip>
        </div>
      </header>

      <nav className="space-y-2.5 px-4 py-2.5">
        {Array.from({ length: 20 }).map((_, index) => (
          <li key={index} className="list-none">
            <Room
              className="w-full"
              title={messages('exampleRoom.title')}
              description={messages('exampleRoom.description')}
              current={1}
              isPrivate
            />
          </li>
        ))}
      </nav>

      <Button
        className="fixed bottom-[5.5rem] right-4 z-50 drop-shadow-2xl data-[hover]:opacity-100"
        variant="primary"
        rounded="full"
        size="lg"
        icon="plus"
        onClick={handleCreateRoomClick(true)}
      >
        {messages('createRoomButton')}
      </Button>
      <CreateRoomModal
        onClose={handleCreateRoomClick(false)}
        visible={isCreateRoomModalVisible}
      />
    </>
  );

  function handleRefreshClick(rotating: boolean) {
    return () => setIsRotating(rotating);
  }

  function handleCreateRoomClick(modalVisible: boolean) {
    return () => setIsCreateRoomModalVisible(modalVisible);
  }
};

const DropdownMenuList = () => (
  <DropdownMenu>
    <ul>
      <li className="border-b border-b-gray-6 pb-2">리스트 01</li>
      <li className="border-b border-b-gray-6 py-2">리스트 02</li>
      <li className="border-b border-b-gray-6 py-2">리스트 03</li>
      <li className="border-b border-b-gray-6 py-2">리스트 04</li>
      <li className="pt-2">리스트 05</li>
    </ul>
  </DropdownMenu>
);

export default HomePage;
