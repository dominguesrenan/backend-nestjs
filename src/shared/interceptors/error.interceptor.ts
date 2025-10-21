import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable()
export class ErrorInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError(error => {
        if (error instanceof HttpException) {
          return throwError(() => error);
        }

        // Para outros tipos de erro, retorna erro interno do servidor
        return throwError(
          () =>
            new HttpException(
              'Erro interno do servidor',
              HttpStatus.INTERNAL_SERVER_ERROR
            )
        );
      })
    );
  }
}
