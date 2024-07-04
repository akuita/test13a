import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { formatCheckInResponse } from '../../shared/utils/response.util';
import { AttendanceRecord } from '../../entities/attendance_records';
import { Employee } from '../../entities/employees';
import { SystemLog } from '../../entities/system_logs';
import { BaseRepository } from '../../shared/base.repository';
import { Repository } from 'typeorm';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: BaseRepository<Employee>,
    @InjectRepository(AttendanceRecord)
    private attendanceRecordRepository: BaseRepository<AttendanceRecord>,
    @InjectRepository(SystemLog)
    private systemLogRepository: BaseRepository<SystemLog>,
  ) {}

  async recordCheckIn(employeeId: number): Promise<{ status: string; error?: string; check_in_time?: string }> {
    try {      
      // Step 1: Validate the "employee_id" against the "employees" table.
      const employee = await this.employeeRepository.findOneBy({ id: employeeId });
      if (!employee) {
        throw new Error('Employee not found');
      }

      // Check if the employee account is active
      if (employee.account_status !== 'active') {
        throw new Error('Inactive account.');
      }

      // Step 2: Check the "attendance_records" table for an existing check-in record for the current date for the given "employee_id".
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      const existingRecord = await this.attendanceRecordRepository.getOne({
        conditions: [
          { column: 'employee_id', value: employeeId, operator: 'EQUAL' },
          { column: 'check_in_time', value: [today, new Date()], operator: 'BETWEEN' },
        ]
      });

      // Step 3: If a check-in record already exists, return { status: 'already checked-in' }.
      if (existingRecord) {
        throw new Error('Employee has already checked in today.');
      }

      // Step 4: If no check-in record exists, create a new record in the "attendance_records" table with the "employee_id", current datetime as "check_in_time", and set the "status" to 'checked-in'.
      const checkInTime = new Date();
      await this.attendanceRecordRepository.createOne({
        data: {
          employee,
          check_in_time: checkInTime,
          status: 'checked-in',
        },
      });

      // Step 5: Log the check-in action in the "system_logs" table with the "employee_id", current timestamp, and the action as "check-in".
      await this.systemLogRepository.createOne({
        data: {
          timestamp: new Date(),
          action: 'check-in',
          employee_id: employeeId,
        }
      });

      // Step 6: Return { status: 'success' } if the check-in record was created successfully.
      return {
        status: 'success',
        check_in_time: checkInTime.toISOString(),
      };
    } catch (error) {      
      // If any error occurs during the process, catch the error and return { status: 'error', error: error.message }.
      return { status: 'error', error: error.message };
    }
  }
}