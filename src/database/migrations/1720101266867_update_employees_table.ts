import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export class updateEmployeesTable1720101266867 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumns('employees', [
            new TableColumn({
                name: 'name',
                type: 'varchar',
                isNullable: false
            }),
            new TableColumn({
                name: 'role',
                type: 'varchar',
                isNullable: false
            }),
            new TableColumn({
                name: 'account_status',
                type: 'varchar',
                isNullable: false
            }),
        ]);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('employees', 'account_status');
        await queryRunner.dropColumn('employees', 'role');
        await queryRunner.dropColumn('employees', 'name');
    }
}