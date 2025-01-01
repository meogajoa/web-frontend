import CartFillIcon from '~/svgs/CartFillIcon';
import HomeFillIcon from '~/svgs/HomeFillIcon';
import PersonFillIcon from '~/svgs/PersonFillIcon';

const MENUS = [
  {
    label: 'store',
    icon: CartFillIcon,
  },
  {
    label: 'home',
    icon: HomeFillIcon,
  },
  {
    label: 'profile',
    icon: PersonFillIcon,
  },
] as const;

type MenusType = (typeof MENUS)[number];

export { MENUS, type MenusType };
