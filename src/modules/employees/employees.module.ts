import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Employee } from '../../entities/employees';
import { EmployeesController } from './employees.controller';
import { EmployeeService } from './employees.service';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    TypeOrmModule.forFeature([Employee]),
    PassportModule.register({ defaultStrategy: 'jwt' }),
  ],
  controllers: [EmployeesController],
  providers: [EmployeeService],
})
export class EmployeesModule {}