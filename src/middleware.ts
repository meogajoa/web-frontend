import createMiddleware from 'next-intl/middleware';
import { NextRequest, NextResponse } from 'next/server';
import { routing } from '~/i18n/routing';
import { Language } from '~/types/misc';
import { extractLocale } from '~/utils/pathname';

const handleI18nRouting = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const hasCorrectLocaleRegex = new RegExp(
    `^/(${Object.values(Language).join('|')})(/.*)?$`,
  );
  if (!hasCorrectLocaleRegex.test(request.nextUrl.pathname)) {
    return NextResponse.redirect(new URL(`/${Language.Kr}`, request.nextUrl));
  }

  const pathname = request.nextUrl.pathname;
  const locale = extractLocale(request.nextUrl.pathname);

  // Redirect to /home when the segment is empty
  if (pathname === `/${locale}`) {
    return NextResponse.redirect(new URL(`${locale}/home`, request.nextUrl));
  }

  return handleI18nRouting(request);
}

export const config = {
  matcher: [
    // Match all pathnames except for
    // - … if they start with `/api`, `/_next` or `/_vercel`
    // - … the ones containing a dot (e.g. `favicon.ico`)
    '/((?!api|_next|_vercel|.*\\..*).*)',
    // However, match all pathnames within `/users`, optionally with a locale prefix
    // '/([\\w-]+)?/users/(.+)',
  ],
};
