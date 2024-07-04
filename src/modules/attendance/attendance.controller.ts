import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { Auth } from '../../decorators/auth.decorator';
import { CurrentUser } from '../../decorators/current-user.decorator';
import { CheckEmployeeCheckInDto } from './dto/check-employee-check-in.dto';
import { AttendanceService } from './attendance.service';

@Controller('api/attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post('check-in')
  @HttpCode(HttpStatus.OK)
  @Auth()
  async checkIn(
    @Body() checkInDto: CheckEmployeeCheckInDto,
    @CurrentUser() user: any,
  ) {
    const result = await this.attendanceService.recordCheckIn(checkInDto.employeeId);

    if (result.status === 'error') {
      throw new Error(result.error);
    }

    if (result.status === 'already checked-in') {
      return {
        status: HttpStatus.CONFLICT,
        message: 'Employee has already checked in today.',
      };
    }

    return {
      status: HttpStatus.OK,
      message: 'Check-in successful.',
      check_in_time: new Date().toISOString(), // Assuming the check-in time is the current time
    };
  }
}