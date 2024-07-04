import { Controller, Get, HttpCode, HttpStatus, UseGuards, Req, Res } from '@nestjs/common';
import { Auth } from 'src/decorators/auth.decorator';
import { AuthGuard } from 'src/guards/auth.guard';
import { EmployeeService } from './employees.service';
import { LoggedInEmployeeInfoDto } from './dto/logged-in-employee-info.dto';

@Controller('api/employees')
export class EmployeesController {
  constructor(private readonly employeeService: EmployeeService) {}

  @Get('/info')
  @HttpCode(HttpStatus.OK)
  @Auth()
  @UseGuards(AuthGuard)
  async getLoggedInEmployeeInfo(@Req() req, @Res() res) {
    try {
      const employeeInfo = await this.employeeService.getLoggedInEmployeeInfo(req.user);
      if (!employeeInfo) {
        return res.status(HttpStatus.NOT_FOUND).json({ message: 'Employee ID does not exist.' });
      }
      const response = new LoggedInEmployeeInfoDto(employeeInfo.name, employeeInfo.role);
      return res.status(HttpStatus.OK).json({
        status: HttpStatus.OK,
        employee: response,
      });
    } catch (error) {
      if (error.status === HttpStatus.BAD_REQUEST) {
        return res.status(HttpStatus.BAD_REQUEST).json({ message: 'Invalid employee ID.' });
      } else if (error.status === HttpStatus.UNAUTHORIZED) {
        return res.status(HttpStatus.UNAUTHORIZED).json({ message: 'Unauthorized.' });
      } else {
        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({ message: 'An unexpected error has occurred on the server.' });
      }
    }
  }
}