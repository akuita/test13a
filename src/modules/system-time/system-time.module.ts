import { Module } from '@nestjs/common';
import { HealthCheckModule } from '../health-check/health-check.module';
import { SystemTimeController } from './system-time.controller';

@Module({
  imports: [HealthCheckModule],
  controllers: [SystemTimeController],
  exports: [],
})
export class SystemTimeModule {}