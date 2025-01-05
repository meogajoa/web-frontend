import { BottomNavigation } from '~/components/BottomNavigation';
import { MENUS } from '~/constants/navigation';
import { usePathname, useRouter } from '~/i18n/routing';
import { cn } from '~/utils/classname';

type Props = Readonly<React.ComponentProps<typeof BottomNavigation>>;

const BottomNavigationContent: React.FC<Props> = ({ className, ...props }) => {
  const pathname = usePathname();
  const router = useRouter();

  return (
    <>
      <div aria-hidden className="h-[4.5rem]" />

      <BottomNavigation
        className={cn('bottom-0-dynamic fixed z-10 w-full', className)}
        {...props}
      >
        {MENUS.map(({ label, icon, href }) => (
          <BottomNavigation.Item
            key={label}
            label={label}
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
