import { createConnection } from 'typeorm';
import { ENV } from '../../../env';

export default class CreatePermissionsSeeder {
  public async run(connection?: any): Promise<any> {
    const connectionToUse =
      connection ||
      (await createConnection({
        type: ENV.DATABASE_TYPE,
        host: ENV.DATABASE_HOST,
        port: ENV.DATABASE_PORT,
        username: ENV.DATABASE_USERNAME,
        password: ENV.DATABASE_PASSWORD,
        database: ENV.DATABASE_NAME,
        entities: ['src/**/*.entity.ts'],
        synchronize: false,
        logging: ENV.DATABASE_LOGGING,
      }));

    // Criar permissões
    const permissions = [
      // Permissões de autenticação
      {
        name: 'auth.register',
        description: 'Registrar novos usuários',
        resource: 'auth',
        action: 'create',
        active: true,
      },
      {
        name: 'auth.login',
        description: 'Fazer login',
        resource: 'auth',
        action: 'create',
        active: true,
      },
      {
        name: 'auth.profile',
        description: 'Visualizar perfil próprio',
        resource: 'auth',
        action: 'read',
        active: true,
      },
      {
        name: 'auth.logout',
        description: 'Fazer logout',
        resource: 'auth',
        action: 'delete',
        active: true,
      },

      // Permissões de usuários
      {
        name: 'users.list',
        description: 'Listar usuários',
        resource: 'users',
        action: 'read',
        active: true,
      },
      {
        name: 'users.read',
        description: 'Visualizar usuário específico',
        resource: 'users',
        action: 'read',
        active: true,
      },
      {
        name: 'users.create',
        description: 'Criar usuários',
        resource: 'users',
        action: 'create',
        active: true,
      },
      {
        name: 'users.update',
        description: 'Atualizar usuários',
        resource: 'users',
        action: 'update',
        active: true,
      },
      {
        name: 'users.update.own',
        description: 'Atualizar próprio perfil',
        resource: 'users',
        action: 'update',
        active: true,
      },
      {
        name: 'users.delete',
        description: 'Deletar usuários',
        resource: 'users',
        action: 'delete',
        active: true,
      },

      // Permissões de segmentos
      {
        name: 'segmentos.list',
        description: 'Listar segmentos',
        resource: 'segmentos',
        action: 'read',
        active: true,
      },
      {
        name: 'segmentos.read',
        description: 'Visualizar segmento específico',
        resource: 'segmentos',
        action: 'read',
        active: true,
      },
      {
        name: 'segmentos.create',
        description: 'Criar segmentos',
        resource: 'segmentos',
        action: 'create',
        active: true,
      },
      {
        name: 'segmentos.update',
        description: 'Atualizar segmentos',
        resource: 'segmentos',
        action: 'update',
        active: true,
      },
      {
        name: 'segmentos.delete',
        description: 'Deletar segmentos',
        resource: 'segmentos',
        action: 'delete',
        active: true,
      },

      // Gerenciamento de permissões e roles
      {
        name: 'permissions.manage',
        description: 'Gerenciar permissões e roles',
        resource: 'permissions',
        action: 'manage',
        active: true,
      },
      {
        name: 'roles.manage',
        description: 'Gerenciar roles',
        resource: 'roles',
        action: 'manage',
        active: true,
      },
    ];

    // Inserir permissões
    for (const permissionData of permissions) {
      const existing = await connectionToUse.query(
        'SELECT id FROM permissions WHERE name = $1',
        [permissionData.name]
      );

      if (existing.length === 0) {
        await connectionToUse.query(
          `
          INSERT INTO permissions (name, description, resource, action, active, "createdAt", "updatedAt")
          VALUES ($1, $2, $3, $4, $5, NOW(), NOW())
        `,
          [
            permissionData.name,
            permissionData.description,
            permissionData.resource,
            permissionData.action,
            permissionData.active,
          ]
        );
      }
    }

    // Buscar roles existentes (já criados pelo roles.seed.ts)
    const adminRole = await connectionToUse.query(
      'SELECT id FROM roles WHERE name = $1',
      ['admin']
    );

    const userRole = await connectionToUse.query(
      'SELECT id FROM roles WHERE name = $1',
      ['user']
    );

    if (adminRole.length === 0 || userRole.length === 0) {
      throw new Error(
        'Roles admin e user devem existir antes de executar este seed'
      );
    }

    // Buscar todas as permissões ativas
    const adminPermissions = await connectionToUse.query(
      'SELECT id FROM permissions WHERE active = true'
    );

    // Buscar permissões para usuário
    const userPermissions = await connectionToUse.query(`
      SELECT id FROM permissions WHERE name IN ('auth.login', 'auth.profile', 'users.update.own', 'segmentos.list')
    `);

    // Associar todas as permissões ao role admin
    for (const permission of adminPermissions) {
      await connectionToUse.query(
        `
        INSERT INTO role_permissions (role_id, permission_id)
        VALUES ($1, $2)
        ON CONFLICT DO NOTHING
      `,
        [adminRole[0].id, permission.id]
      );
    }

    // Associar permissões ao role user
    for (const permission of userPermissions) {
      await connectionToUse.query(
        `
        INSERT INTO role_permissions (role_id, permission_id)
        VALUES ($1, $2)
        ON CONFLICT DO NOTHING
      `,
        [userRole[0].id, permission.id]
      );
    }

    console.log('✅ Permissões associadas aos roles com sucesso!');

    if (!connection) {
      await connectionToUse.close();
    }
  }
}
