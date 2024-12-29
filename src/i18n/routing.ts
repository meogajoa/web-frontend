import { createNavigation } from 'next-intl/navigation';
import { defineRouting } from 'next-intl/routing';

export enum Language {
  En = 'en',
  Kr = 'kr',
  Jp = 'jp',
  Es = 'es',
  ZhCn = 'zh-CN',
  ZhTw = 'zh-TW',
}

export const routing = defineRouting({
  locales: Object.values(Language),
  defaultLocale: Language.En,
});

export const { Link, redirect, usePathname, useRouter, getPathname } =
  createNavigation(routing);
