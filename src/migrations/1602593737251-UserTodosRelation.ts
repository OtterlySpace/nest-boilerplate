import { MigrationInterface, QueryRunner } from "typeorm"

export class UserTodosRelation1602593737251 implements MigrationInterface {
	name = "UserTodosRelation1602593737251"

	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "todo" ADD "authorId" uuid`)
		await queryRunner.query(`ALTER TABLE "todo" ADD CONSTRAINT "FK_c56120106977cc14f975726af07" FOREIGN KEY ("authorId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`)
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.query(`ALTER TABLE "todo" DROP CONSTRAINT "FK_c56120106977cc14f975726af07"`)
		await queryRunner.query(`ALTER TABLE "todo" DROP COLUMN "authorId"`)
	}

}
