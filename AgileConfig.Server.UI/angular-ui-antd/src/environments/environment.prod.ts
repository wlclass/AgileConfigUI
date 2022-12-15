import { Environment } from '@delon/theme';

export const environment = {
  production: true,
  useHash: true,
  SERVER_URL: `http://localhost:5000`,
  api: {
    baseUrl: './',
    refreshTokenEnabled: true,
    refreshTokenType: 'auth-refresh'
  }
} as Environment;
