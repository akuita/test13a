import { IsNumber } from 'class-validator';

export class GetEmployeeDetailsDto {
  @IsNumber({}, { message: 'employeeId must be a number' })
  employeeId: number;
}