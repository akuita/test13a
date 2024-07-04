import { EntityRepository, Repository } from 'typeorm';
import { AttendanceRecord } from '../../entities/attendance_records';
import { provideCustomRepository } from '../../utils/repository';
import { DataSource } from 'typeorm';
import { Injectable } from '@nestjs/common';

@EntityRepository(AttendanceRecord)
export class AttendanceRepository extends Repository<AttendanceRecord> {
  constructor(
    entity: Function,
    manager: any,
    queryRunner: any
  ) {
    super(entity, manager, queryRunner);
  }

  async checkIn(employeeId: number): Promise<{ status: string; message?: string }> {
    const currentDate = new Date();
    currentDate.setHours(0, 0, 0, 0);

    const existingCheckIn = await this.findOne({
      where: {
        employee: { id: employeeId },
        check_in_time: currentDate
      }
    });

    if (existingCheckIn) {
      return { status: 'already checked-in' };
    }

    const checkInRecord = this.create({
      employee: { id: employeeId },
      check_in_time: new Date(),
      status: 'checked-in'
    });

    await this.save(checkInRecord);

    // Assuming there is a SystemLog entity and repository
    // This part of the code should be in a service or a separate method
    // const systemLogRepository = getCustomRepository(SystemLogRepository);
    // await systemLogRepository.createLog(employeeId, 'check-in');

    return { status: 'success' };
  }
}

export const AttendanceRepositoryProvider = provideCustomRepository(AttendanceRecord, AttendanceRepository);