import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Employee } from './employee';

@Entity('attendance_records')
export class AttendanceRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  created_at: Date;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP', onUpdate: 'CURRENT_TIMESTAMP' })
  updated_at: Date;

  @Column({ type: 'time' })
  check_in_time: string;

  @Column({ type: 'time', nullable: true })
  check_out_time: string;

  @Column({ type: 'date' })
  date: string;

  @Column()
  employee_id: number;

  @ManyToOne(() => Employee, employee => employee.attendance_records)
  employee: Employee;
}