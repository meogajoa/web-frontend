export const serializeToUrlEncoded = (data: Record<string, any>): string => {
  return new URLSearchParams(data).toString();
};

export const buildLocalizedPath = (
  locale: string,
  path: string,
  query?: Record<string, any>,
): string => {
  const queryString = query ? `?${serializeToUrlEncoded(query)}` : '';
  return `/${locale}${path}${queryString}`;
};

export const sleep = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));
