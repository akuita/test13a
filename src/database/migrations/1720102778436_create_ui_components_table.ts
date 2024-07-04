import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createUIComponentsTable1720102778436 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'ui_components',
            columns: [
                {
                    name: 'id',
                    type: 'int',
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: 'increment',
                },
                {
                    name: 'created_at',
                    type: 'timestamp',
                    default: 'now()',
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'now()',
                    onUpdate: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'component_name',
                    type: 'varchar',
                },
                {
                    name: 'component_type',
                    type: 'varchar',
                },
            ],
        }), true);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('ui_components');
    }

}