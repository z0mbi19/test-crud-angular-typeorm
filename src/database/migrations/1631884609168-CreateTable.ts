import { MigrationInterface, QueryRunner } from "typeorm";

export class CreateTable1631884609168 implements MigrationInterface {
    name = 'CreateTable1631884609168'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`app_db\`.\`categories\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` varchar(255) NOT NULL, \`imagem\` varchar(255) , PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`app_db\`.\`products\` (\`id\` int NOT NULL AUTO_INCREMENT, \`nome\` varchar(255) NOT NULL, \`imagem\` varchar(255) , \`idCategId\` int NULL, INDEX \`REL_46f73fc941164c5277ab655a60\` (\`idCategId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`app_db\`.\`users\` (\`id\` int NOT NULL AUTO_INCREMENT, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`app_db\`.\`products\` ADD CONSTRAINT \`FK_46f73fc941164c5277ab655a609\` FOREIGN KEY (\`idCategId\`) REFERENCES \`app_db\`.\`categories\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`app_db\`.\`products\` DROP FOREIGN KEY \`FK_46f73fc941164c5277ab655a609\``);
        await queryRunner.query(`DROP TABLE \`app_db\`.\`users\``);
        await queryRunner.query(`DROP INDEX \`REL_46f73fc941164c5277ab655a60\` ON \`app_db\`.\`products\``);
        await queryRunner.query(`DROP TABLE \`app_db\`.\`products\``);
        await queryRunner.query(`DROP TABLE \`app_db\`.\`categories\``);
    }

}
