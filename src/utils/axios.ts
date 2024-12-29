import axios from 'axios';
import { redirect } from 'next/navigation';
import { CONFIGS } from '~/utils/config';
import { isProduction } from './misc';

const server = axios.create({
  baseURL: isProduction ? CONFIGS.API_URL : '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

server.interceptors.request.use((config) => {
  const token = localStorage.getItem('sessionid');

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

server.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      console.error('Unauthorized! Redirecting to login...');
      redirect('/account/sign-in');
    }

    return Promise.reject(error);
  },
);

export { server };
