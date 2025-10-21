import { registerAs } from '@nestjs/config';
import { EMAIL_CONSTANTS } from '../shared/constants';

export default registerAs('mail', () => ({
  host: EMAIL_CONSTANTS.HOST,
  port: EMAIL_CONSTANTS.PORT,
  secure: EMAIL_CONSTANTS.SECURE,
  auth: {
    user: EMAIL_CONSTANTS.USER,
    pass: EMAIL_CONSTANTS.PASSWORD,
  },
  from: EMAIL_CONSTANTS.FROM,
  tls: {
    rejectUnauthorized: false,
  },
}));
