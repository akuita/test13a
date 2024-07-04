import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from 'src/entities/employees';
import { Repository } from 'typeorm';
import { AttendanceRecord } from 'src/entities/attendance_records';
import { ErrorUtil } from 'src/shared/utils/error.util';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(AttendanceRecord)
    private attendanceRepository: Repository<AttendanceRecord>,
    @InjectRepository(Employee)
    private employeeRepository: Repository<Employee>,
    private errorUtil: ErrorUtil,
  ) {}

  async processCheckIn(employeeId: number): Promise<any> {
    try {
      // Check if employee exists
      const employee = await this.employeeRepository.findOne(employeeId);
      if (!employee) {
        throw new Error('Invalid employee ID.');
      }

      // Check if employee has already checked in today
      const today = new Date().toISOString().split('T')[0]; // Extract date in YYYY-MM-DD format
      const existingRecord = await this.attendanceRepository.findOne({
        where: { employee_id: employeeId, date: today },
      });
      if (existingRecord) {
        throw new Error('Employee has already checked in today.');
      }

      // Record check-in time and update employee status
      const checkInTime = new Date();
      const attendanceRecord = this.attendanceRepository.create({
        employee_id: employeeId,
        check_in_time: checkInTime.toISOString().split('T')[1].slice(0, 8), // Extract time in HH:MM:SS format
        date: today,
      });
      await this.attendanceRepository.save(attendanceRecord);

      // Update employee status
      employee.status = 'Checked in';
      await this.employeeRepository.save(employee);

      return { message: 'Check-in successful' };
    } catch (error) {
      return this.errorUtil.handleCheckInError(employeeId);
    }
  }
}
import { handleCheckInError } from 'src/shared/utils/error.util';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(AttendanceRecord)
    private attendanceRepository: Repository<AttendanceRecord>,
  ) {}

  async processCheckIn(employeeId: number): Promise<any> {
    try {
      const checkInTime = new Date();
      const attendanceRecord = this.attendanceRepository.create({
        employee_id: employeeId,
        check_in_time: checkInTime.toISOString().split('T')[1].slice(0, 8), // Extract time in HH:MM:SS format
        date: checkInTime.toISOString().split('T')[0], // Extract date in YYYY-MM-DD format
      });
      await this.attendanceRepository.save(attendanceRecord);
      return { message: 'Check-in successful' };
    } catch (error) {
      return handleCheckInError(employeeId);
    }
  }
}