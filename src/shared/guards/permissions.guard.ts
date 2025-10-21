import {
  Injectable,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PermissionsService } from '../../core/permissions/permissions.service';

export interface PermissionRequirement {
  resource: string;
  action: string;
}

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private permissionsService: PermissionsService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    // Se não há usuário, negar acesso
    if (!user) {
      throw new ForbiddenException('Usuário não autenticado');
    }

    // Se o usuário não tem role definido, negar acesso
    if (!user.userRole) {
      throw new ForbiddenException('Usuário sem role definido');
    }

    // Buscar as permissões necessárias do decorator
    const requiredPermissions = this.reflector.get<PermissionRequirement[]>(
      'permissions',
      context.getHandler()
    );

    // Se não há permissões definidas, permitir acesso
    if (!requiredPermissions || requiredPermissions.length === 0) {
      return true;
    }

    // Verificar se o usuário tem pelo menos uma das permissões necessárias
    for (const requiredPermission of requiredPermissions) {
      const hasPermission = user.userRole.permissions.some(
        (permission: any) =>
          permission.resource === requiredPermission.resource &&
          permission.action === requiredPermission.action &&
          permission.active
      );

      if (hasPermission) {
        return true;
      }
    }

    throw new ForbiddenException('Acesso negado: permissões insuficientes');
  }
}
