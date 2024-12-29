export const isProduction = process.env.NODE_ENV === 'production';

export const serializeToUrlEncoded = (data: Record<string, any>): string => {
  return new URLSearchParams(data).toString();
};
