import { MigrationInterface, QueryRunner } from 'typeorm';

export class userTokens1728162814418 implements MigrationInterface {
  name = 'userTokens1728162814418';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `CREATE TABLE "users_tokens" ("id" character varying NOT NULL, "refresh_token" character varying NOT NULL, "user_id" uuid NOT NULL, "expires_date" TIMESTAMP NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_9f236389174a6ccbd746f53dca8" PRIMARY KEY ("id"))`
    );
    await queryRunner.query(
      `ALTER TABLE "users_tokens" ADD CONSTRAINT "FK_32f96022cc5076fe565a5cba20b" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "users_tokens" DROP CONSTRAINT "FK_32f96022cc5076fe565a5cba20b"`
    );
    await queryRunner.query(`DROP TABLE "users_tokens"`);
  }
}
