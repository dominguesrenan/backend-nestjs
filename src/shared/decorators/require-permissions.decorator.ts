import { SetMetadata } from '@nestjs/common';
import { PermissionRequirement } from '../guards/permissions.guard';

export const PERMISSIONS_KEY = 'permissions';

export const RequirePermissions = (...permissions: PermissionRequirement[]) =>
  SetMetadata(PERMISSIONS_KEY, permissions);
