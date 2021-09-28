import {MigrationInterface, QueryRunner} from "typeorm";

export class uniqColumn1632722452734 implements MigrationInterface {
    name = 'uniqColumn1632722452734'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`shorten\`.\`user\` ADD UNIQUE INDEX \`IDX_065d4d8f3b5adb4a08841eae3c\` (\`name\`)`);
        await queryRunner.query(`ALTER TABLE \`shorten\`.\`link\` ADD UNIQUE INDEX \`IDX_8d459fb7405923bb08b9bbcf62\` (\`shorten\`)`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`shorten\`.\`link\` DROP INDEX \`IDX_8d459fb7405923bb08b9bbcf62\``);
        await queryRunner.query(`ALTER TABLE \`shorten\`.\`user\` DROP INDEX \`IDX_065d4d8f3b5adb4a08841eae3c\``);
    }

}
