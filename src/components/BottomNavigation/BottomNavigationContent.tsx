import { useTranslations } from 'next-intl';
import React from 'react';
import { BottomNavigation } from '~/components/BottomNavigation';
import { MENUS, MenuType } from '~/constants/navigation';
import { usePathname, useRouter } from '~/i18n/routing';
import { cn } from '~/utils/classname';

type Props = {
  className?: React.ComponentProps<'footer'>['className'];
};

const BottomNavigationContent: React.FC<Props> = ({ className }) => {
  const pathname = usePathname();
  const router = useRouter();
  const t = useTranslations('bottomNavigation');

  return (
    <>
      <div
        className={cn(
          'h-[4.5rem] transition-all duration-300',
          // hide && 'h-0'
        )}
        aria-hidden
      />

      <BottomNavigation
        className={cn(
          'bottom-0-dynamic fixed z-10 w-full shadow-top transition-transform duration-300',
          // hide && 'translate-y-full',
          className,
        )}
      >
        {MENUS.map(({ label, icon, href }) => (
          <BottomNavigation.Item
            key={label}
            label={t(label) as MenuType['label']}
            isActive={href === pathname}
            icon={icon}
            onButtonClick={() => router.push(href)}
          />
        ))}
      </BottomNavigation>
    </>
  );
};

export default BottomNavigationContent;
