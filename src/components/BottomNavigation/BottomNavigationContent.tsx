import { useTranslations } from 'next-intl';
import { BottomNavigation } from '~/components/BottomNavigation';
import { MENUS, MenuType } from '~/constants/navigation';
import { usePathname, useRouter } from '~/i18n/routing';
import { cn } from '~/utils/classname';

type Props = React.ComponentProps<typeof BottomNavigation>;

const BottomNavigationContent: React.FC<Props> = ({ className, ...props }) => {
  const pathname = usePathname();
  const router = useRouter();
  const messages = useTranslations('bottomNavigation');

  return (
    <>
      <div aria-hidden className="h-[4.5rem]" />

      <BottomNavigation
        className={cn(
          'bottom-0-dynamic fixed z-10 w-full shadow-top',
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
