// ================================= //
// Script de reset do banco de dados //
// ================================= //

import { execSync } from 'child_process';

async function resetDatabase() {
  console.log('🔄 Iniciando reset completo do banco de dados...');

  try {
    // Recriar o banco completamente
    console.log('🗑️ Recriando banco de dados...');
    try {
      // Desconectar qualquer conexão existente
      execSync(
        'docker-compose exec postgres psql -U root -d sistemabase -c "SELECT pg_terminate_backend(pg_stat_activity.pid) FROM pg_stat_activity WHERE pg_stat_activity.datname = \'sistemabase\' AND pid <> pg_backend_pid();" || true',
        {
          stdio: 'pipe',
          cwd: '/usr/src/app',
        }
      );

      // Dropar e recriar o banco
      execSync(
        'docker-compose exec postgres psql -U root -c "DROP DATABASE IF EXISTS sistemabase;"',
        {
          stdio: 'pipe',
          cwd: '/usr/src/app',
        }
      );

      execSync(
        'docker-compose exec postgres psql -U root -c "CREATE DATABASE sistemabase;"',
        {
          stdio: 'pipe',
          cwd: '/usr/src/app',
        }
      );

      console.log('✅ Banco de dados recriado com sucesso');
    } catch (recreateError) {
      console.log(
        'ℹ️ Erro ao recriar banco, tentando abordagem alternativa...'
      );
      // Tentar apenas limpar as tabelas existentes
      const tables = [
        'users',
        'segmentos',
        'role_permissions',
        'roles',
        'permissions',
        'migrations',
        'typeorm_metadata',
      ];
      for (const table of tables) {
        try {
          execSync(
            `docker-compose exec postgres psql -U root -d sistemabase -c "DROP TABLE IF EXISTS ${table} CASCADE;"`,
            {
              stdio: 'pipe',
              cwd: '/usr/src/app',
            }
          );
        } catch (e) {
          // Ignorar erros individuais
        }
      }
    }

    // Executar todas as migrações
    console.log('🚀 Executando migrações...');
    execSync('npm run migration:run', {
      stdio: 'inherit',
      cwd: '/usr/src/app',
    });

    // Executar seeds diretamente (corrigindo o caminho)
    console.log('🌱 Executando seeds...');
    try {
      execSync(
        'npx ts-node -r tsconfig-paths/register src/database/seeds/index.ts',
        {
          stdio: 'inherit',
          cwd: '/usr/src/app',
        }
      );
    } catch (seedError) {
      console.log('⚠️ Erro ao executar seeds, tentando caminho alternativo...');
      try {
        execSync(
          'npx ts-node -r tsconfig-paths/register src/core/database/seeds/index.ts',
          {
            stdio: 'inherit',
            cwd: '/usr/src/app',
          }
        );
      } catch (alternativeError) {
        console.log('❌ Falha ao executar seeds. Execute manualmente:');
        console.log('docker-compose exec backend npm run seed:run');
      }
    }

    console.log('✅ Reset completo realizado com sucesso!');
  } catch (error) {
    console.error('❌ Erro durante o reset:', error.message);
    console.log('💡 Tente executar os comandos manualmente:');
    console.log('docker-compose exec backend npm run migration:run');
    console.log('docker-compose exec backend npm run seed:run');
    process.exit(1);
  }
}

resetDatabase().catch(console.error);
