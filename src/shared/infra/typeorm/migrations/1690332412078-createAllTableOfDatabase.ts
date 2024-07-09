import {MigrationInterface, QueryRunner} from "typeorm";

export class createAllTableOfDatabase1690332412078 implements MigrationInterface {
    name = 'createAllTableOfDatabase1690332412078'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "users" ("id" uuid NOT NULL, "name" character varying NOT NULL, "email" character varying NOT NULL, "password" character varying NOT NULL, "driver_license" character varying NOT NULL, "admin" boolean NOT NULL DEFAULT false, "avatar" character varying, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "UQ_97672ac88f789774dd47f7c8be3" UNIQUE ("email"), CONSTRAINT "PK_a3ffb1c0c8416b9fc6f907b7433" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "categories" ("id" uuid NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_24dbc6126a28ff948da33e97d3b" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "specifications" ("id" uuid NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_621aabf71e640ab86f0e8b62a37" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "cars" ("id" uuid NOT NULL, "name" character varying NOT NULL, "description" character varying NOT NULL, "daily_rate" integer NOT NULL, "available" boolean NOT NULL DEFAULT true, "license_plate" character varying NOT NULL, "fine_amount" integer NOT NULL, "brand" character varying NOT NULL, "category_id" uuid NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), "updated_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_fc218aa84e79b477d55322271b6" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TABLE "specifications_car" ("car_id" uuid NOT NULL, "specification_id" uuid NOT NULL, CONSTRAINT "PK_45624bf070e7313d3e821dfc514" PRIMARY KEY ("car_id", "specification_id"))`);
        await queryRunner.query(`CREATE INDEX "IDX_bc11f0eaee377e0f2ee47fd12d" ON "specifications_car" ("car_id") `);
        await queryRunner.query(`CREATE INDEX "IDX_834adffa0244fe0b22baf597d1" ON "specifications_car" ("specification_id") `);
        await queryRunner.query(`ALTER TABLE "cars" ADD CONSTRAINT "FK_9b6410d2f4eabb985524faae074" FOREIGN KEY ("category_id") REFERENCES "categories"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE "specifications_car" ADD CONSTRAINT "FK_bc11f0eaee377e0f2ee47fd12d9" FOREIGN KEY ("car_id") REFERENCES "cars"("id") ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE "specifications_car" ADD CONSTRAINT "FK_834adffa0244fe0b22baf597d1b" FOREIGN KEY ("specification_id") REFERENCES "specifications"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "specifications_car" DROP CONSTRAINT "FK_834adffa0244fe0b22baf597d1b"`);
        await queryRunner.query(`ALTER TABLE "specifications_car" DROP CONSTRAINT "FK_bc11f0eaee377e0f2ee47fd12d9"`);
        await queryRunner.query(`ALTER TABLE "cars" DROP CONSTRAINT "FK_9b6410d2f4eabb985524faae074"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_834adffa0244fe0b22baf597d1"`);
        await queryRunner.query(`DROP INDEX "public"."IDX_bc11f0eaee377e0f2ee47fd12d"`);
        await queryRunner.query(`DROP TABLE "specifications_car"`);
        await queryRunner.query(`DROP TABLE "cars"`);
        await queryRunner.query(`DROP TABLE "specifications"`);
        await queryRunner.query(`DROP TABLE "categories"`);
        await queryRunner.query(`DROP TABLE "users"`);
    }

}
