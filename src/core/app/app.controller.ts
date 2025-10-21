import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('health')
  getHealth(): object {
    return this.appService.getHealth();
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('info')
  getInfo(): object {
    return {
      name: 'Sistema Base NestJS',
      version: '1.0.0',
      description: 'API REST com NestJS, TypeORM e autenticação JWT',
      endpoints: {
        health: '/api/health',
        info: '/api/info',
        auth: {
          register: 'POST /api/auth/register',
          login: 'POST /api/auth/login',
          profile: 'GET /api/auth/profile',
          logout: 'POST /api/auth/logout',
        },
        users: {
          list: 'GET /api/users',
          get: 'GET /api/users/:id',
          create: 'POST /api/users',
          update: 'PUT /api/users/:id',
          updatePatch: 'PATCH /api/users/:id',
          delete: 'DELETE /api/users/:id',
        },
        segmentos: {
          list: 'GET /api/segmentos',
          get: 'GET /api/segmentos/:id',
          create: 'POST /api/segmentos',
          update: 'PUT /api/segmentos/:id',
          delete: 'DELETE /api/segmentos/:id',
        },
      },
    };
  }
}
