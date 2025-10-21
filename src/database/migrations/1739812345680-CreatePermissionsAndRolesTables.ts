import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from 'typeorm';

export class CreatePermissionsAndRolesTables1739812345680
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    // Criar tabela de permissões
    await queryRunner.createTable(
      new Table({
        name: 'permissions',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'description',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'resource',
            type: 'varchar',
          },
          {
            name: 'action',
            type: 'varchar',
          },
          {
            name: 'active',
            type: 'boolean',
            default: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      })
    );

    // Criar tabela de roles
    await queryRunner.createTable(
      new Table({
        name: 'roles',
        columns: [
          {
            name: 'id',
            type: 'int',
            isPrimary: true,
            isGenerated: true,
            generationStrategy: 'increment',
          },
          {
            name: 'name',
            type: 'varchar',
            isUnique: true,
          },
          {
            name: 'description',
            type: 'text',
            isNullable: true,
          },
          {
            name: 'active',
            type: 'boolean',
            default: true,
          },
          {
            name: 'createdAt',
            type: 'timestamp',
            default: 'now()',
          },
          {
            name: 'updatedAt',
            type: 'timestamp',
            default: 'now()',
          },
        ],
      })
    );

    // Criar tabela de relacionamento role_permissions (Many-to-Many)
    await queryRunner.createTable(
      new Table({
        name: 'role_permissions',
        columns: [
          {
            name: 'role_id',
            type: 'int',
          },
          {
            name: 'permission_id',
            type: 'int',
          },
        ],
      })
    );

    // Adicionar foreign keys
    await queryRunner.createForeignKey(
      'role_permissions',
      new TableForeignKey({
        columnNames: ['role_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'roles',
        onDelete: 'CASCADE',
      })
    );

    await queryRunner.createForeignKey(
      'role_permissions',
      new TableForeignKey({
        columnNames: ['permission_id'],
        referencedColumnNames: ['id'],
        referencedTableName: 'permissions',
        onDelete: 'CASCADE',
      })
    );

    // Adicionar coluna role_id na tabela users (será feita em migração separada)
    // await queryRunner.query(`ALTER TABLE "users" ADD COLUMN "role_id" integer`);

    // Criar foreign key para role_id (será feita em migração separada)
    // await queryRunner.createForeignKey(
    //   'users',
    //   new TableForeignKey({
    //     columnNames: ['role_id'],
    //     referencedColumnNames: ['id'],
    //     referencedTableName: 'roles',
    //     onDelete: 'SET NULL',
    //   })
    // );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remover foreign key da tabela users
    await queryRunner.dropForeignKey('users', 'fk_users_role');

    // Remover coluna role_id da tabela users
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role_id"`);

    // Remover foreign keys da tabela role_permissions
    await queryRunner.dropForeignKey(
      'role_permissions',
      'fk_role_permissions_role'
    );
    await queryRunner.dropForeignKey(
      'role_permissions',
      'fk_role_permissions_permission'
    );

    // Remover tabelas na ordem inversa
    await queryRunner.dropTable('role_permissions');
    await queryRunner.dropTable('roles');
    await queryRunner.dropTable('permissions');
  }
}
