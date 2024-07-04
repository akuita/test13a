import { IsNotEmpty, IsNumber } from 'class-validator';

export class HandleCheckInFailureDto {
  @IsNumber()
  @IsNotEmpty()
  employee_id: number;
}