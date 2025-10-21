import { createConnection } from 'typeorm';
import { ENV } from '../../../env';

async function runAllSeeds() {
  console.log('🚀 Iniciando execução de seeds...');

  // Conexão com o banco de dados
  const connection = await createConnection({
    type: ENV.DATABASE_TYPE,
    host: ENV.DATABASE_HOST,
    port: ENV.DATABASE_PORT,
    username: ENV.DATABASE_USERNAME,
    password: ENV.DATABASE_PASSWORD,
    database: ENV.DATABASE_NAME,
    entities: ['src/**/*.entity.ts'],
    synchronize: false,
    logging: ENV.DATABASE_LOGGING,
  });

  try {
    // 1. Primeiro: executar seed de roles (admin e user)
    console.log('🏷️ Executando seed de roles...');
    const { default: RolesSeeder } = await import('./roles.seed');
    const rolesSeeder = new RolesSeeder();
    await rolesSeeder.run(connection);

    // 2. Depois: executar seed de permissões e associar aos roles
    console.log('🔐 Executando seed de permissões...');
    const { default: PermissionsSeeder } = await import('./permissions.seed');
    const permissionsSeeder = new PermissionsSeeder();
    await permissionsSeeder.run(connection);

    // 3. Por último: executar seed de usuários
    console.log('👥 Executando seed de usuários...');
    const { runSeeds } = await import('./user.seed');
    await runSeeds(connection);

    console.log('✅ Todos os seeds executados com sucesso!');
  } catch (error) {
    console.error('❌ Erro ao executar seeds:', error);
    throw error;
  } finally {
    await connection.close();
  }
}

runAllSeeds().catch(console.error);
