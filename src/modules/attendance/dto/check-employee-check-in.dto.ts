import { IsNumber } from 'class-validator';

export class CheckEmployeeCheckInDto {
  @IsNumber({}, { message: 'employeeId must be a number' })
  employeeId: number;
}