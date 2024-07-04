import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn, UpdateDateColumn } from 'typeorm';
import { Employee } from './employee';

@Entity()
export class SystemLog {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  @Column()
  timestamp: Date;

  @Column()
  action: string;

  @ManyToOne(() => Employee, employee => employee.system_logs)
  @Column({ nullable: true })
  employee_id: number;
}