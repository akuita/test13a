import { IsInt, IsNotEmpty } from 'class-validator';

export class CheckInDto {
  @IsInt({ message: 'Invalid employee ID.' })
  @IsNotEmpty({ message: 'Employee ID must not be empty.' })
  employee_id: number;
}