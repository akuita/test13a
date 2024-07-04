import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  UpdateDateColumn
} from 'typeorm';
import { Employee } from './employee';

@Entity('attendance_records')
export class AttendanceRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn({ type: 'timestamp' })
  created_at: Date;

  @UpdateDateColumn({ type: 'timestamp' })
  updated_at: Date;

  @Column('timestamp')
  check_in_time: Date;

  @Column('timestamp', { nullable: true })
  check_out_time: Date;

  @Column('varchar')
  status: string;

  @ManyToOne(() => Employee, employee => employee.attendance_records)
  @JoinColumn({ name: 'employee_id' })
  employee: Employee;
}