import {MigrationInterface, QueryRunner, TableColumn, TableForeignKey} from "typeorm";

export class updateAttendanceRecordsTable1720102719101 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn('attendance_records', new TableColumn({
            name: 'employee_id',
            type: 'int',
            isNullable: false
        }));

        await queryRunner.createForeignKey('attendance_records', new TableForeignKey({
            columnNames: ['employee_id'],
            referencedColumnNames: ['id'],
            referencedTableName: 'employees',
            onDelete: 'CASCADE'
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        const table = await queryRunner.getTable('attendance_records');
        const foreignKey = table.foreignKeys.find(fk => fk.columnNames.indexOf('employee_id') !== -1);
        await queryRunner.dropForeignKey('attendance_records', foreignKey);
        await queryRunner.dropColumn('attendance_records', 'employee_id');
    }

}