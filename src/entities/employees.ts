import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { AttendanceRecord } from './attendance_records';
import { SystemLog } from './system_logs';

@Entity()
export class Employee {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @Column()
  name: string;

  @Column()
  role: string;

  @Column()
  account_status: string;

  @OneToMany(() => AttendanceRecord, attendanceRecord => attendanceRecord.employee)
  attendance_records: AttendanceRecord[];

  @OneToMany(() => SystemLog, systemLog => systemLog.employee)
  system_logs: SystemLog[];
}