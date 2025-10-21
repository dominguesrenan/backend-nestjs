import { createConnection } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { ENV } from '../../../env';

export async function runSeeds(connection?: any) {
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

  // Geração de salt
  const saltRounds = 10;

  // Hash das senhas
  const adminPassword = await bcrypt.hash('password', saltRounds);
  const userPassword = await bcrypt.hash('password', saltRounds);

  // Criar usuários
  await connectionToUse.query(`
    INSERT INTO "users" (name, email, password, "createdAt", "updatedAt") VALUES
    ('Administrador', 'admin@example.com', '${adminPassword}', NOW(), NOW()),
    ('Usuário Teste', 'user@example.com', '${userPassword}', NOW(), NOW())
    ON CONFLICT (email) DO NOTHING
  `);

  // Associar roles aos usuários
  await assignRolesToUsers(connectionToUse);

  console.log('✅ Seeds de usuários executados com sucesso!');

  if (!connection) {
    await connectionToUse.close();
  }
}

async function assignRolesToUsers(connection: any) {
  // Buscar IDs dos roles
  const adminRoleId = await connection.query(
    'SELECT id FROM roles WHERE name = $1',
    ['admin']
  );
  const userRoleId = await connection.query(
    'SELECT id FROM roles WHERE name = $1',
    ['user']
  );

  // Associar admin role ao usuário admin
  await connection.query(
    `
    UPDATE users SET role_id = $1, role = 'admin' WHERE email = 'admin@example.com'
  `,
    [adminRoleId[0].id]
  );

  // Associar user role ao usuário user
  await connection.query(
    `
    UPDATE users SET role_id = $1, role = 'user' WHERE email = 'user@example.com'
  `,
    [userRoleId[0].id]
  );

  console.log('✅ Roles associados aos usuários!');
}
