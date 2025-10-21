import { registerAs } from '@nestjs/config';
import { DATABASE_CONSTANTS } from '../shared/constants';

export default registerAs('database', () => ({
  type: DATABASE_CONSTANTS.TYPE,
  host: DATABASE_CONSTANTS.HOST,
  port: DATABASE_CONSTANTS.PORT,
  username: DATABASE_CONSTANTS.USERNAME,
  password: DATABASE_CONSTANTS.PASSWORD,
  database: DATABASE_CONSTANTS.DATABASE,
  synchronize: DATABASE_CONSTANTS.SYNCHRONIZE,
  logging: DATABASE_CONSTANTS.LOGGING,
  migrationsRun: DATABASE_CONSTANTS.MIGRATIONS_RUN,
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/database/migrations/*{.ts,.js}'],
  cli: {
    entitiesDir: 'src',
    migrationsDir: 'src/database/migrations',
  },
  ssl:
    process.env.NODE_ENV === 'production'
      ? { rejectUnauthorized: false }
      : false,
}));
