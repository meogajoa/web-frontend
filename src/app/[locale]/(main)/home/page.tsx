'use client';

import { Button as HeadlessuiButton } from '@headlessui/react';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import React from 'react';
import { Button } from '~/components/Button';
import DropdownMenu from '~/components/DropdownMenu';
import { Room } from '~/components/Room';
import Tooltip from '~/components/Tooltip';
import { cn } from '~/utils/classname';

const HomePage = () => {
  const [isRotating, setIsRotating] = React.useState(false);

  return (
    <>
      <div className="flex h-[5.5rem] items-center justify-between px-4">
        <h1 className="text-3xl font-semibold">게임 이름(추후 협의 필요)</h1>
        <HeadlessuiButton
          as={ArrowPathIcon}
          className={cn(
            'size-6 stroke-black',
            isRotating && 'rotate-[360deg] transition-transform duration-1000',
          )}
          onClick={setIsRotating.bind(null, true)}
          onTransitionEnd={setIsRotating.bind(null, false)}
        />
      </div>

      <div className="shadow-bottom flex gap-x-4 p-4">
        <Tooltip
          contents={<DropdownMenuList />}
          clickable
          clickToOpen
          offset={20}
          place="bottom-start"
        >
          <Button size="sm" rounded="full" icon="chevron-down">
            카테고리
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
            방 공개
          </Button>
        </Tooltip>
      </div>

      <nav className="mt-2.5 space-y-2.5 px-4">
        {Array.from({ length: 20 }).map((_, index) => (
          <li key={index} className="list-none">
            <Room
              className="w-full"
              title="방 제목 1"
              description="미니게임 전용"
              current={1}
              isPrivate
            />
          </li>
        ))}
      </nav>
    </>
  );
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
