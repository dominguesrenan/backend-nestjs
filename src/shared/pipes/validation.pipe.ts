import {
  Injectable,
  BadRequestException,
  ValidationPipe,
} from '@nestjs/common';

@Injectable()
export class CustomValidationPipe extends ValidationPipe {
  constructor() {
    super({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
      exceptionFactory: errors => {
        const messages = errors
          .map(error => Object.values(error.constraints || {}).join(', '))
          .join('; ');

        return new BadRequestException(
          `Dados de entrada inválidos: ${messages}`
        );
      },
    });
  }
}
