import {MigrationInterface, QueryRunner, TableColumn} from "typeorm";

export class updateEmployeesTable1720102719101 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('employees', new TableColumn({
            name: 'email',
            type: 'varchar',
            length: '255',
            isNullable: false
        }));
        await queryRunner.changeColumn('employees', 'role', new TableColumn({
            name: 'role',
            type: 'varchar',
            length: '100',
            isNullable: false
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('employees', 'email');
        await queryRunner.changeColumn('employees', 'role', new TableColumn({
            name: 'role',
            type: 'varchar',
            length: '50',
            isNullable: false
        }));
    }

}