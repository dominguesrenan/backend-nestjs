import { MigrationInterface, QueryRunner } from 'typeorm';

export class AddRoleIdToUsers1760493526180 implements MigrationInterface {
  name = 'AddRoleIdToUsers1760493526180';

  public async up(queryRunner: QueryRunner): Promise<void> {
    // Adicionar coluna role_id na tabela users
    await queryRunner.query(`ALTER TABLE "users" ADD COLUMN "role_id" integer`);

    // Criar foreign key para role_id
    await queryRunner.query(`
      ALTER TABLE "users" ADD CONSTRAINT "FK_user_role"
      FOREIGN KEY ("role_id") REFERENCES "roles"("id") ON DELETE SET NULL
    `);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    // Remover foreign key
    await queryRunner.query(
      `ALTER TABLE "users" DROP CONSTRAINT "FK_user_role"`
    );

    // Remover coluna role_id
    await queryRunner.query(`ALTER TABLE "users" DROP COLUMN "role_id"`);
  }
}
