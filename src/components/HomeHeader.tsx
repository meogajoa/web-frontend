import { Button as HeadlessuiButton } from '@headlessui/react';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import React from 'react';
import { Button } from '~/components/Button';
import Tooltip from '~/components/Tooltip';
import { cn } from '~/utils/classname';

const HomeHeader = () => {
  const messages = useTranslations('homeRoute');
  const [isRotating, setIsRotating] = React.useState(false);
  const queryClient = useQueryClient();

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
            contents={<h1>Dropdown</h1>}
            clickable
            clickToOpen
            openOnClick
            offset={20}
            place="bottom-start"
          >
            <Button size="sm" rounded="full" icon="chevron-down">
              {messages('header.categoryButton')}
            </Button>
          </Tooltip>

          <Tooltip
            contents={<h1>Dropdown</h1>}
            clickable
            clickToOpen
            openOnClick
            offset={20}
            place="bottom-start"
          >
            <Button size="sm" rounded="full" icon="chevron-down">
              {messages('header.roomVisibilityButton')}
            </Button>
          </Tooltip>
        </div>
      </header>
    </>
  );

  function handleRefreshClick(isRefreshing: boolean) {
    return () => {
      if (isRefreshing) {
        queryClient.resetQueries({ queryKey: ['rooms'] });
      }

      setIsRotating(isRefreshing);
    };
  }
};

export default HomeHeader;
