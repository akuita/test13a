import { Controller, Get, HttpCode, HttpStatus } from '@nestjs/common';
import { HealthCheckService } from '../health-check/health-check.service';

@Controller()
export class SystemTimeController {
  constructor(private readonly healthCheckService: HealthCheckService) {}

  @Get('/api/system/time')
  @HttpCode(HttpStatus.OK)
  getCurrentTime() {
    const currentTime = this.healthCheckService.getCurrentDateTime();
    return {
      status: HttpStatus.OK,
      current_time: currentTime,
    };
  }
}