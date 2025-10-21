import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_PIPE, APP_INTERCEPTOR, APP_FILTER } from '@nestjs/core';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from '../users/users.module';
import { AuthModule } from '../auth/auth.module';
import { SegmentosModule } from '../segmentos/segmentos.module';
import { PermissionsModule } from '../permissions/permissions.module';
import { DatabaseModule } from '../../database/database.module';
import { CustomValidationPipe } from '../../shared/pipes/validation.pipe';
import { ErrorInterceptor } from '../../shared/interceptors/error.interceptor';
import { LoggingInterceptor } from '../../shared/interceptors/logging.interceptor';
import { GlobalExceptionFilter } from '../../shared/filters';
import appConfig from '../../config/app.config';
import databaseConfig from '../../config/database.config';
import mailConfig from '../../config/mail.config';
import { validate } from '../../config/env.validation';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.env',
      validate,
      load: [appConfig, databaseConfig, mailConfig],
    }),
    DatabaseModule,
    UsersModule,
    AuthModule,
    SegmentosModule,
    PermissionsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_PIPE,
      useClass: CustomValidationPipe,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: GlobalExceptionFilter,
    },
  ],
})
export class AppModule {}
