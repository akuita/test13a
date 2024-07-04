import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { AttendanceService } from './attendance.service';

@Controller('api/attendance')
export class AttendanceController {
  constructor(private readonly attendanceService: AttendanceService) {}

  @Post('/check-in')
  @UseGuards(AuthGuard)
  async checkIn(@Body('employee_id') employeeId: number) {
    const result = await this.attendanceService.processCheckIn(employeeId);
    if (result.message === 'Check-in successful') {
      return {
        status: 200,
        message: result.message,
        visual_indicator: "Lorem Ipsum is simply dummy text."
      };
    } else {
      // Assuming handleCheckInError returns an object with a 'status' and 'message' property
      return {
        status: result.status,
        message: result.message,
      };
    }
  }
}