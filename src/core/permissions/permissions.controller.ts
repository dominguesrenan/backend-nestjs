import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { PermissionsService } from './permissions.service';
import {
  CreatePermissionDto,
  UpdatePermissionDto,
  CreateRoleDto,
  UpdateRoleDto,
} from './dto/permission.dto';
import { Permission } from './entities/permission.entity';
import { Role } from './entities/role.entity';

@Controller('permissions')
export class PermissionsController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Get()
  async findAllPermissions(): Promise<Permission[]> {
    return this.permissionsService.findAllPermissions();
  }

  @Get(':id')
  async findPermissionById(@Param('id') id: string): Promise<Permission> {
    return this.permissionsService.findPermissionById(+id);
  }

  @Post()
  async createPermission(
    @Body() createPermissionDto: CreatePermissionDto
  ): Promise<Permission> {
    return this.permissionsService.createPermission(createPermissionDto);
  }

  @Put(':id')
  async updatePermission(
    @Param('id') id: string,
    @Body() updatePermissionDto: UpdatePermissionDto
  ): Promise<Permission> {
    return this.permissionsService.updatePermission(+id, updatePermissionDto);
  }

  @Delete(':id')
  async deletePermission(@Param('id') id: string): Promise<void> {
    return this.permissionsService.deletePermission(+id);
  }
}

@Controller('roles')
export class RolesController {
  constructor(private readonly permissionsService: PermissionsService) {}

  @Get()
  async findAllRoles(): Promise<Role[]> {
    return this.permissionsService.findAllRoles();
  }

  @Get(':id')
  async findRoleById(@Param('id') id: string): Promise<Role> {
    return this.permissionsService.findRoleById(+id);
  }

  @Post()
  async createRole(@Body() createRoleDto: CreateRoleDto): Promise<Role> {
    return this.permissionsService.createRole(createRoleDto);
  }

  @Put(':id')
  async updateRole(
    @Param('id') id: string,
    @Body() updateRoleDto: UpdateRoleDto
  ): Promise<Role> {
    return this.permissionsService.updateRole(+id, updateRoleDto);
  }

  @Delete(':id')
  async deleteRole(@Param('id') id: string): Promise<void> {
    return this.permissionsService.deleteRole(+id);
  }

  @Post('initialize-defaults')
  async initializeDefaults(): Promise<{ message: string }> {
    await this.permissionsService.initializeDefaultPermissions();
    await this.permissionsService.initializeDefaultRoles();

    return { message: 'Permissões e roles padrão inicializados com sucesso' };
  }
}
