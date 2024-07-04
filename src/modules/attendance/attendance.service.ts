import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AttendanceRecord } from 'src/entities/attendance_records';
import { startOfDay, endOfDay } from 'date-fns';

@Injectable()
export class AttendanceService {
  constructor(
    @InjectRepository(AttendanceRecord)
    private readonly attendanceRecordRepository: Repository<AttendanceRecord>,
  ) {}

  async checkEmployeeCheckIn(employeeId: number): Promise<boolean> {
    const today = new Date();
    const checkInRecord = await this.attendanceRecordRepository.findOne({
      where: {
        employee_id: employeeId,
        check_in_time: Between(startOfDay(today), endOfDay(today)),
      },
    });
    return !!checkInRecord;
  }
}