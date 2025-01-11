import axios from 'axios';
import { CONFIGS } from '~/utils/config';
import { isProduction } from '~/utils/env';

export const server = (() => {
  const instance = axios.create({
    baseURL: isProduction() ? CONFIGS.API_URL : CONFIGS.DEV_API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('sessionId');
    if (token) {
      config.headers.Authorization = `${token}`;
    }

    return config;
  });

  instance.interceptors.response.use(
    (response) => response,
    (error: unknown) => {
      if (error instanceof axios.AxiosError) {
        if (error.response) {
          console.error('[ERROR]: Axios error', error);

          if ([401, 403].includes(error.response.status)) {
            localStorage.removeItem('sessionId');
            window?.location.replace('/');
          }
        } else {
          console.error(`[ERROR]: Network error`, error);
          // TODO: Handle network error
        }
      } else {
        console.error('[ERROR]: Unknown error', error);
      }

      return Promise.reject(error);
    },
  );

  return instance;
})();
