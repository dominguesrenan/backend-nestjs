import { NestFactory } from '@nestjs/core';
import { ConfigService } from '@nestjs/config';
import { AppModule } from './core/app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get(ConfigService);
  const port = configService.get<number>('app.port') || 4000;
  const apiPrefix = configService.get<string>('app.apiPrefix') || 'api';
  const corsOrigin = configService.get<string>('app.corsOrigin');

  // Habilitar CORS
  app.enableCors({
    origin: corsOrigin,
    credentials: true,
  });

  // Prefixo global para API
  app.setGlobalPrefix(apiPrefix);

  await app.listen(port);
  console.log(`Aplicação rodando na porta ${port}`);
}
bootstrap();
