import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from 'src/entities/employees';
import { EmployeesController } from './employees.controller';
import { EmployeeService } from './employees.service';

@Module({
  imports: [TypeOrmModule.forFeature([Employee])],
  controllers: [EmployeesController],
  providers: [EmployeeService],
})
export class EmployeesModule {}