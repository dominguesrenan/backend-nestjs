import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, In } from 'typeorm';
import { Permission } from './entities/permission.entity';
import { Role } from './entities/role.entity';
import {
  CreatePermissionDto,
  UpdatePermissionDto,
  CreateRoleDto,
  UpdateRoleDto,
} from './dto/permission.dto';

@Injectable()
export class PermissionsService {
  constructor(
    @InjectRepository(Permission)
    private permissionsRepository: Repository<Permission>,
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>
  ) {}

  // ========== PERMISSIONS ==========

  async findAllPermissions(): Promise<Permission[]> {
    return this.permissionsRepository.find({
      where: { active: true },
      order: { resource: 'ASC', action: 'ASC' },
    });
  }

  async findPermissionById(id: number): Promise<Permission> {
    const permission = await this.permissionsRepository.findOne({
      where: { id, active: true },
    });

    if (!permission) {
      throw new NotFoundException(`Permissão com ID ${id} não encontrada`);
    }

    return permission;
  }

  async createPermission(
    createPermissionDto: CreatePermissionDto
  ): Promise<Permission> {
    const permission = this.permissionsRepository.create({
      ...createPermissionDto,
      active: createPermissionDto.active ?? true,
    });

    return this.permissionsRepository.save(permission);
  }

  async updatePermission(
    id: number,
    updatePermissionDto: UpdatePermissionDto
  ): Promise<Permission> {
    const permission = await this.findPermissionById(id);

    await this.permissionsRepository.update(id, updatePermissionDto);

    return this.findPermissionById(id);
  }

  async deletePermission(id: number): Promise<void> {
    const permission = await this.findPermissionById(id);

    // Soft delete - desativar ao invés de remover
    await this.permissionsRepository.update(id, { active: false });
  }

  // ========== ROLES ==========

  async findAllRoles(): Promise<Role[]> {
    return this.rolesRepository.find({
      where: { active: true },
      relations: ['permissions'],
      order: { name: 'ASC' },
    });
  }

  async findRoleById(id: number): Promise<Role> {
    const role = await this.rolesRepository.findOne({
      where: { id, active: true },
      relations: ['permissions'],
    });

    if (!role) {
      throw new NotFoundException(`Role com ID ${id} não encontrado`);
    }

    return role;
  }

  async findRoleByName(name: string): Promise<Role | null> {
    return this.rolesRepository.findOne({
      where: { name, active: true },
      relations: ['permissions'],
    });
  }

  async createRole(createRoleDto: CreateRoleDto): Promise<Role> {
    // Verificar se já existe role com esse nome
    const existingRole = await this.findRoleByName(createRoleDto.name);
    if (existingRole) {
      throw new Error(`Role com nome "${createRoleDto.name}" já existe`);
    }

    const role = this.rolesRepository.create({
      ...createRoleDto,
      active: createRoleDto.active ?? true,
    });

    // Se permissionIds foram fornecidos, associar as permissões
    if (createRoleDto.permissionIds && createRoleDto.permissionIds.length > 0) {
      const permissions = await this.permissionsRepository.find({
        where: { id: In(createRoleDto.permissionIds), active: true },
      });
      role.permissions = permissions;
    }

    return this.rolesRepository.save(role);
  }

  async updateRole(id: number, updateRoleDto: UpdateRoleDto): Promise<Role> {
    const role = await this.findRoleById(id);

    // Se estiver mudando o nome, verificar se já existe
    if (updateRoleDto.name && updateRoleDto.name !== role.name) {
      const existingRole = await this.findRoleByName(updateRoleDto.name);
      if (existingRole) {
        throw new Error(`Role com nome "${updateRoleDto.name}" já existe`);
      }
    }

    // Atualizar permissões se fornecidas
    if (updateRoleDto.permissionIds) {
      const permissions = await this.permissionsRepository.find({
        where: { id: In(updateRoleDto.permissionIds), active: true },
      });
      role.permissions = permissions;
    }

    await this.rolesRepository.update(id, updateRoleDto);

    return this.findRoleById(id);
  }

  async deleteRole(id: number): Promise<void> {
    const role = await this.findRoleById(id);

    // Soft delete - desativar ao invés de remover
    await this.rolesRepository.update(id, { active: false });
  }

  // ========== UTILITIES ==========

  async initializeDefaultPermissions(): Promise<void> {
    const defaultPermissions = [
      // Permissões de autenticação
      {
        name: 'auth.register',
        resource: 'auth',
        action: 'create',
        description: 'Registrar novos usuários',
      },
      {
        name: 'auth.login',
        resource: 'auth',
        action: 'create',
        description: 'Fazer login',
      },
      {
        name: 'auth.profile',
        resource: 'auth',
        action: 'read',
        description: 'Visualizar perfil próprio',
      },

      // Permissões de usuários
      {
        name: 'users.list',
        resource: 'users',
        action: 'read',
        description: 'Listar usuários',
      },
      {
        name: 'users.read',
        resource: 'users',
        action: 'read',
        description: 'Visualizar usuário específico',
      },
      {
        name: 'users.create',
        resource: 'users',
        action: 'create',
        description: 'Criar usuários',
      },
      {
        name: 'users.update',
        resource: 'users',
        action: 'update',
        description: 'Atualizar usuários',
      },
      {
        name: 'users.update.own',
        resource: 'users',
        action: 'update',
        description: 'Atualizar próprio perfil',
      },
      {
        name: 'users.delete',
        resource: 'users',
        action: 'delete',
        description: 'Deletar usuários',
      },

      // Permissões de segmentos
      {
        name: 'segmentos.list',
        resource: 'segmentos',
        action: 'read',
        description: 'Listar segmentos',
      },
      {
        name: 'segmentos.read',
        resource: 'segmentos',
        action: 'read',
        description: 'Visualizar segmento específico',
      },
      {
        name: 'segmentos.create',
        resource: 'segmentos',
        action: 'create',
        description: 'Criar segmentos',
      },
      {
        name: 'segmentos.update',
        resource: 'segmentos',
        action: 'update',
        description: 'Atualizar segmentos',
      },
      {
        name: 'segmentos.delete',
        resource: 'segmentos',
        action: 'delete',
        description: 'Deletar segmentos',
      },

      // Gerenciamento de permissões e roles
      {
        name: 'permissions.manage',
        resource: 'permissions',
        action: 'manage',
        description: 'Gerenciar permissões e roles',
      },
    ];

    for (const permData of defaultPermissions) {
      const existing = await this.permissionsRepository.findOne({
        where: { name: permData.name },
      });

      if (!existing) {
        const permission = this.permissionsRepository.create(permData);
        await this.permissionsRepository.save(permission);
      }
    }
  }

  async initializeDefaultRoles(): Promise<void> {
    // Criar role admin
    const adminPermissions = await this.permissionsRepository.find({
      where: { active: true },
    });

    let adminRole = await this.findRoleByName('admin');
    if (!adminRole) {
      adminRole = await this.createRole({
        name: 'admin',
        description: 'Administrador com acesso total',
        permissionIds: adminPermissions.map(p => p.id),
      });
    }

    // Criar role user
    const userPermissions = await this.permissionsRepository.find({
      where: {
        active: true,
        name: In([
          'auth.login',
          'auth.profile',
          'users.update.own',
          'segmentos.list',
        ]),
      },
    });

    let userRole = await this.findRoleByName('user');
    if (!userRole) {
      await this.createRole({
        name: 'user',
        description: 'Usuário padrão com permissões básicas',
        permissionIds: userPermissions.map(p => p.id),
      });
    }
  }
}
