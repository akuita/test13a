import { Body, Controller, HttpCode, HttpStatus, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guard';
import { AttendanceService } from './attendance.service';
import { EmployeeRepository } from 'src/repositories/employee.repository';
import { Employee } from 'src/entities/employees';
import { ErrorUtil } from 'src/shared/utils/error.util';

@Controller('api/attendance')
export class AttendanceController {
  constructor(
    private readonly attendanceService: AttendanceService,
    private readonly employeeRepository: EmployeeRepository,
    private readonly errorUtil: ErrorUtil,
  ) {}

  @Post('check-in/error')
  @UseGuards(AuthGuard)
  @HttpCode(HttpStatus.OK)
  async handleCheckInError(@Body() body: { employee_id: number }): Promise<any> {
    // Validate employee_id
    if (!Number.isInteger(body.employee_id)) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Invalid employee ID.',
      };
    }

    // Check if employee exists using EmployeeRepository
    const employee = await this.employeeRepository.findOne({ where: { id: body.employee_id } });
    if (!employee) {
      return {
        statusCode: HttpStatus.BAD_REQUEST,
        message: 'Invalid employee ID.',
      };
    }

    // Process check-in error
    try {
      const result = await this.attendanceService.processCheckInError(body.employee_id);
      return {
        statusCode: result.statusCode,
        error_message: result.message,
        retry_option: true,
        contact_support_option: true,
      };
    } catch (error) {
      return this.errorUtil.handleCheckInError(body.employee_id);
    }
  }
}