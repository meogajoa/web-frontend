export const CONFIGS = {
  API_URL: process.env.API_URL,
  DEV_API_URL: process.env.DEV_API_URL || 'http://localhost:8080',
  WS_URL: process.env.WS_URL || 'ws://localhost:8080/ws',
} as const;
