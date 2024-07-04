import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AttendanceRecord } from 'src/entities/attendance_records';
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