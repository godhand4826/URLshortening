import {MigrationInterface, QueryRunner} from "typeorm";

export class userAndLink1632540327293 implements MigrationInterface {
    name = 'userAndLink1632540327293'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`shorten\`.\`user\` (\`id\` int NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`shorten\`.\`link\` (\`id\` int NOT NULL AUTO_INCREMENT, \`origin\` varchar(255) NOT NULL, \`shorten\` varchar(255) NOT NULL, \`userId\` int NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`shorten\`.\`link\` ADD CONSTRAINT \`FK_14a562b14bb83fc8ba73d30d3e0\` FOREIGN KEY (\`userId\`) REFERENCES \`shorten\`.\`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`shorten\`.\`link\` DROP FOREIGN KEY \`FK_14a562b14bb83fc8ba73d30d3e0\``);
        await queryRunner.query(`DROP TABLE \`shorten\`.\`link\``);
        await queryRunner.query(`DROP TABLE \`shorten\`.\`user\``);
    }

}
