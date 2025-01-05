import axios from 'axios';
import { CONFIGS } from '~/utils/config';
import { isProduction } from '~/utils/misc';

export const server = (() => {
  const instance = axios.create({
    baseURL: isProduction ? CONFIGS.API_URL : CONFIGS.DEV_API_URL,
    headers: {
      'Content-Type': 'application/json',
    },
  });

  instance.interceptors.request.use((config) => {
    const token = localStorage.getItem('sessionId');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if ([401, 403].includes(error.response?.status)) {
        localStorage.removeItem('sessionId');
        window?.location.replace('/');
      }

      return Promise.reject(error);
    },
  );

  return instance;
})();
