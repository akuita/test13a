import { Module } from '@nestjs/common';
import { HealthCheckModule } from '../health-check/health-check.module';
import { SystemTimeController } from './system-time.controller';
import { HealthCheckService } from '../health-check/health-check.service';

@Module({
  imports: [HealthCheckModule],
  controllers: [SystemTimeController],
  providers: [HealthCheckService],
  exports: [SystemTimeController],
})
export class SystemTimeModule {}