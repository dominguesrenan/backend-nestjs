import { createConnection } from 'typeorm';
import { ENV } from '../../../env';

export default class CreateRolesSeeder {
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

    console.log('🏷️ Criando roles básicos...');

    // Criar role admin
    await connectionToUse.query(`
      INSERT INTO roles (name, description, active, "createdAt", "updatedAt")
      VALUES ('admin', 'Administrador com acesso total', true, NOW(), NOW())
      ON CONFLICT (name) DO NOTHING
    `);

    // Criar role user
    await connectionToUse.query(`
      INSERT INTO roles (name, description, active, "createdAt", "updatedAt")
      VALUES ('user', 'Usuário padrão com permissões básicas', true, NOW(), NOW())
      ON CONFLICT (name) DO NOTHING
    `);

    console.log('✅ Roles admin e user criados com sucesso!');

    if (!connection) {
      await connectionToUse.close();
    }
  }
}
