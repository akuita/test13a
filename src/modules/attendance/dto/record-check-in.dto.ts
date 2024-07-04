import { IsNumber } from 'class-validator';

export class RecordCheckInDto {
  @IsNumber({}, { message: 'employeeId must be a number' })
  employeeId: number;
}