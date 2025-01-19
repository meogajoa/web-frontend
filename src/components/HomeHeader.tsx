'use client';

import { Button as HeadlessuiButton } from '@headlessui/react';
import { ArrowPathIcon } from '@heroicons/react/24/outline';
import { useQueryClient } from '@tanstack/react-query';
import { useTranslations } from 'next-intl';
import React from 'react';
import { DropdownExample } from '~/components/Dropdown';
import { cn } from '~/utils/classname';

type Props = {
  className?: React.ComponentProps<'header'>['className'];
  renderPlaceholder?: boolean;
};

const HomeHeader: React.FC<Props> = ({ className, renderPlaceholder }) => {
  const t = useTranslations('homeRoute');
  const [isRotating, setIsRotating] = React.useState(false);
  const queryClient = useQueryClient();

  return (
    <>
      {renderPlaceholder && <div className="h-[9.75rem]" aria-hidden />}

      <header className={cn('h-fit bg-white', className)}>
        <div className="flex h-[5.5rem] items-center justify-between px-4">
          <h1 className="text-3xl font-semibold">{t('header.title')}</h1>
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
          <DropdownExample>{t('header.categoryButton')}</DropdownExample>
          <DropdownExample>{t('header.roomVisibilityButton')}</DropdownExample>
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
