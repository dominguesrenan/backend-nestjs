import { Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';

@Injectable()
export class OptionalJwtAuthGuard extends AuthGuard('jwt') {
  handleRequest(err, user, info, context) {
    // Se não há erro e usuário existe, retorna o usuário
    if (user) {
      return user;
    }

    // Se não há erro mas também não há usuário, retorna null (usuário não autenticado)
    if (!err && !user) {
      return null;
    }

    // Se há erro, lança a exceção
    if (err) {
      throw err;
    }

    return null;
  }
}
