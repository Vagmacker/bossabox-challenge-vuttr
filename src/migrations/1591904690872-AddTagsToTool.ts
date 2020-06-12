import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class AddTagsToTool1591904690872 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.addColumn("tools", new TableColumn({
            name: "tags",
            type: "varchar"
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<any> {
        await queryRunner.dropColumn("tools", 'tags')
    }
}
