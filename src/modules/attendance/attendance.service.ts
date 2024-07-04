import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmailService } from 'src/shared/email/email.service';
import { Employee } from 'src/entities/employees';
import { Repository } from 'typeorm';
import { AttendanceRecord } from 'src/entities/attendance_records';
import { ErrorUtil } from 'src/shared/utils/error.util';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(AttendanceRecord)
    private attendanceRepository: Repository<AttendanceRecord>,
    private emailService: EmailService
  ) {}

  async processCheckInError(employeeId: number): Promise<any> {
    const employeeExists = await this.attendanceRepository.findOne({ where: { id: employeeId } });
    if (!employeeExists) {
      return {
        statusCode: 400,
        message: 'Invalid employee ID.',
      };
    }

    const errorResponse = await new ErrorUtil(this.emailService).handleCheckInError(employeeId);
    return {
      status: errorResponse.statusCode,
      error_message: errorResponse.message,
      retry_option: true,
      contact_support_option: true,
    };
  }

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
      return this.processCheckInError(employeeId);
    }
  }
}