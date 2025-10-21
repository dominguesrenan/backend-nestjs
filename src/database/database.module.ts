import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { User } from '../core/users/entities/user.entity';
import { Segmento } from '../core/segmentos/entities/segmento.entity';
import { Role } from '../core/permissions/entities/role.entity';
import { Permission } from '../core/permissions/entities/permission.entity';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        const databaseType = configService.get<string>('database.type');

        // Configurações base para todos os bancos de dados
        const baseConfig = {
          host: configService.get<string>('database.host'),
          port: configService.get<number>('database.port'),
          username: configService.get<string>('database.username'),
          password: configService.get<string>('database.password'),
          database: configService.get<string>('database.database'),
          entities: [User, Segmento, Role, Permission],
          migrations: ['dist/migrations/*.js'],
          migrationsTableName: 'migrations',
          synchronize: configService.get<boolean>('database.synchronize'),
          logging: configService.get<boolean>('database.logging'),
          ssl: configService.get<boolean>('database.ssl'),
        };

        // Configurações específicas para cada banco de dados
        if (databaseType === 'postgres') {
          return {
            type: 'postgres' as const,
            ...baseConfig,
          };
        } else if (databaseType === 'mysql') {
          return {
            type: 'mysql' as const,
            ...baseConfig,
          };
        } else if (databaseType === 'sqlite') {
          return {
            type: 'sqlite' as const,
            ...baseConfig,
          };
        } else if (databaseType === 'mongodb') {
          return {
            type: 'mongodb' as const,
            ...baseConfig,
          };
        } else {
          // Por padrão usa PostgreSQL
          return {
            type: 'postgres' as const,
            ...baseConfig,
          };
        }
      },
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([User, Segmento, Role, Permission]),
  ],
  exports: [TypeOrmModule],
})
export class DatabaseModule {}
