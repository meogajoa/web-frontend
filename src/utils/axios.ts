import axios from 'axios';
import { redirect } from 'next/navigation';
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
    const token = localStorage.getItem('sessionid');

    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  instance.interceptors.response.use(
    (response) => response,
    (error) => {
      if (error.response?.status === 401) {
        console.error('Unauthorized! Redirecting to login...');
        redirect('/account/sign-in');
      }

      return Promise.reject(error);
    },
  );

  return instance;
})();
