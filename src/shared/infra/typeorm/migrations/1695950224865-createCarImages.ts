import {MigrationInterface, QueryRunner} from "typeorm";

export class createCarImages1695950224865 implements MigrationInterface {
    name = 'createCarImages1695950224865'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "cars_images" ("id" uuid NOT NULL, "car_id" uuid NOT NULL, "image_name" character varying NOT NULL, "created_at" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_6180002831bf7873c4c37d7a5a7" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "cars_images" ADD CONSTRAINT "FK_0835d7e3db7a80af5acb3d8b606" FOREIGN KEY ("car_id") REFERENCES "cars"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "cars_images" DROP CONSTRAINT "FK_0835d7e3db7a80af5acb3d8b606"`);
        await queryRunner.query(`DROP TABLE "cars_images"`);
    }

}
