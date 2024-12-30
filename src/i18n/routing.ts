import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';
import { Language } from '~/types/misc';

export const routing = defineRouting({
  locales: Object.values(Language),
  defaultLocale: Language.En,
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
