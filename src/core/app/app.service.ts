import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Olá! Sistema Base NestJS funcionando!';
  }

  getHealth(): object {
    return {
      status: 'OK',
      message: 'Sistema funcionando corretamente',
      timestamp: new Date().toISOString(),
    };
  }
}
