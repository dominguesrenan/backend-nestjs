import { registerAs } from '@nestjs/config';
import { APP_CONSTANTS } from '../shared/constants';

export default registerAs('app', () => ({
  port: APP_CONSTANTS.DEFAULT_PORT,
  apiPrefix: APP_CONSTANTS.API_PREFIX,
  corsOrigin: APP_CONSTANTS.CORS_ORIGIN,
  environment: process.env.NODE_ENV || 'development',
  isDevelopment: process.env.NODE_ENV === 'development',
  isProduction: process.env.NODE_ENV === 'production',
  isTest: process.env.NODE_ENV === 'test',
  jwt: {
    secret: APP_CONSTANTS.JWT_SECRET,
    expiresIn: APP_CONSTANTS.JWT_EXPIRES_IN,
    refreshSecret: APP_CONSTANTS.JWT_REFRESH_SECRET,
    refreshExpiresIn: APP_CONSTANTS.JWT_REFRESH_EXPIRES_IN,
  },
}));
