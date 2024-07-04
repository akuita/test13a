import { IsInt, IsNotEmpty, Validate } from 'class-validator';
import { EmployeeExists } from '../../shared/validators/employee-exists.validator';

export class HandleCheckInErrorDto {
  @IsNotEmpty({ message: 'Employee ID must not be empty.' })
  @IsInt({ message: 'Employee ID must be a valid integer.' })
  @Validate(EmployeeExists, {
    message: 'Invalid employee ID.',
  })
  employee_id: number;
}