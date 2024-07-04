import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createAttendanceRecordsTable1720101291473 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: 'attendance_records',
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
                    default: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'updated_at',
                    type: 'timestamp',
                    default: 'CURRENT_TIMESTAMP',
                    onUpdate: 'CURRENT_TIMESTAMP',
                },
                {
                    name: 'check_in_time',
                    type: 'timestamp',
                },
                {
                    name: 'check_out_time',
                    type: 'timestamp',
                    isNullable: true,
                },
                {
                    name: 'status',
                    type: 'varchar',
                },
                {
                    name: 'employee_id',
                    type: 'int',
                },
            ],
            foreignKeys: [
                {
                    columnNames: ['employee_id'],
                    referencedTableName: 'employees',
                    referencedColumnNames: ['id'],
                    onDelete: 'CASCADE',
                },
            ],
        }));
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('attendance_records');
    }
}