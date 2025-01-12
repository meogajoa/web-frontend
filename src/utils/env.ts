export const isBrowser = () => {
  return typeof window === 'object';
};

export const isProduction = () => {
  return process.env.NODE_ENV === 'production';
};

export const isMobile = () => {
  if (!isBrowser()) {
    return false;
  }

  const userAgent = navigator.userAgent || navigator.vendor;
  return /mobi|android|blackberry|iphone|ipad|ipod|opera mini|iemobile|wpdesktop|fb_iab|fban|fbav|webos|windows phone/i.test(
    userAgent.toLowerCase(),
  );
};
