import {
  Controller,
  Get,
  Param,
  HttpException,
  HttpStatus,
  UseGuards,
} from '@nestjs/common';
import { EmployeeService } from './employees.service';
import { GetEmployeeDetailsDto } from './dto/get-employee-details.dto';
import { AuthGuard } from '../../guards/auth.guard';

@Controller('api/employees')
export class EmployeesController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get(':employee_id/details')
  @UseGuards(AuthGuard)
  async getEmployeeDetails(@Param() params: GetEmployeeDetailsDto) {
    try {
      const employeeDetails = await this.employeeService.getEmployeeDetails(params.employee_id);
      return {
        status: HttpStatus.OK,
        employee: {
          id: employeeDetails.id,
          name: employeeDetails.name,
          role: employeeDetails.role,
          account_status: employeeDetails.account_status,
        },
      };
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw new HttpException(error.response, HttpStatus.NOT_FOUND);
      } else {
        throw new HttpException('Internal Server Error', HttpStatus.INTERNAL_SERVER_ERROR);
      }
    }
  }
}