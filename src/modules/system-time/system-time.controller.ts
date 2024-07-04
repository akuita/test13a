import { Controller, Get, HttpCode } from '@nestjs/common';
import { HealthCheckService } from '../health-check/health-check.service';

@Controller()
export class SystemTimeController {
  constructor(private readonly healthCheckService: HealthCheckService) {}

  @Get('/api/system/time')
  @HttpCode(200)
  getCurrentTime() {
    const currentTime = this.healthCheckService.getCurrentDateTime();
    return {
      status: 200,
      current_time: currentTime,
    };
  }
}