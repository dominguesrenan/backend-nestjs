import { ConnectionOptions } from 'typeorm';
import { ENV } from './env';

const ormConfig: ConnectionOptions = {
  type: ENV.DATABASE_TYPE,
  host: ENV.DATABASE_HOST,
  port: ENV.DATABASE_PORT,
  username: ENV.DATABASE_USERNAME,
  password: ENV.DATABASE_PASSWORD,
  database: ENV.DATABASE_NAME,
  entities: ['src/**/*.entity.ts'],
  migrations: ['src/database/migrations/**/*.ts'],
  migrationsTableName: 'migrations',
  synchronize: false,
  logging: ENV.DATABASE_LOGGING,
  cli: {
    entitiesDir: 'src',
    migrationsDir: 'src/database/migrations',
  },
};

export default ormConfig;

export { ormConfig };
