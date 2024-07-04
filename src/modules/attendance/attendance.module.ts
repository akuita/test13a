import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AttendanceService } from './attendance.service';
import { AttendanceController } from './attendance.controller';
import { Employee } from '../../entities/employees';
import { AttendanceRecord } from '../../entities/attendance_records';
import { SystemLog } from '../../entities/system_logs';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee, AttendanceRecord, SystemLog]),
  ],
  controllers: [AttendanceController],
  providers: [AttendanceService],
})
export class AttendanceModule {}