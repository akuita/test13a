import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class createSystemStatusesTable1720102778436 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(new Table({
      name: 'system_statuses',
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
          name: 'operational',
          type: 'boolean',
        },
        {
          name: 'last_sync_time',
          type: 'timestamp',
          isNullable: true,
        },
        {
          name: 'connectivity_status',
          type: 'varchar',
          length: '255',
        },
      ],
    }), true);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable('system_statuses');
  }
}