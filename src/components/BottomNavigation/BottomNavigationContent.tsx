import { useTranslations } from 'next-intl';
import React from 'react';
import { BottomNavigation } from '~/components/BottomNavigation';
import { MENUS, MenuType } from '~/constants/navigation';
import { usePathname, useRouter } from '~/i18n/routing';
import { cn } from '~/utils/classname';
import { CONFIGS } from '~/utils/config';

type Props = React.ComponentProps<typeof BottomNavigation>;

const BottomNavigationContent: React.FC<Props> = ({ className, ...props }) => {
  const pathname = usePathname();
  const router = useRouter();
  const messages = useTranslations('bottomNavigation');
  const [hide, setHide] = React.useState(false);

  React.useEffect(() => {
    setHide(
      CONFIGS.NAV_HIDE_URLS_ARRAY.some((url) => pathname.startsWith(url)),
    );
  }, [pathname]);

  return (
    <>
      <div
        aria-hidden
        className={cn('h-[4.5rem] transition-all duration-300', hide && 'h-0')}
      />

      <BottomNavigation
        className={cn(
          'bottom-0-dynamic fixed z-10 w-full shadow-top transition-transform duration-300',
          hide && 'translate-y-full',
          className,
        )}
        {...props}
      >
        {MENUS.map(({ label, icon, href }) => (
          <BottomNavigation.Item
            key={label}
            label={messages(label) as MenuType['label']}
            isActive={href === pathname}
            icon={icon}
            onClick={() => router.push(href)}
          />
        ))}
      </BottomNavigation>
    </>
  );
};

export default BottomNavigationContent;
