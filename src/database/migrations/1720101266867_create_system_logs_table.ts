import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class createSystemLogsTable1720101266867 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'system_logs',
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
                },
                {
                    name: 'timestamp',
                    type: 'timestamp',
                    default: 'now()',
                },
                {
                    name: 'action',
                    type: 'varchar',
                },
                {
                    name: 'employee_id',
                    type: 'int',
                    isNullable: true,
                },
            ],
            foreignKeys: [
                {
                    columnNames: ['employee_id'],
                    referencedColumnNames: ['id'],
                    referencedTableName: 'employees',
                    onDelete: 'SET NULL',
                },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('system_logs');
    }

}