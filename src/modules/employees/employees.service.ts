import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from 'src/entities/employees';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { BaseRepository } from 'src/shared/base.repository';
import { QueryOperator } from 'src/shared/query-operator.enum';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: BaseRepository<Employee>,
  ) {}

  getIdFromContext(@CurrentUser() employee: Employee) {
    if (!employee || !employee.employee_id) {
      throw new Error('No employee context available');
    }
    return employee.employee_id;
  }

  async getLoggedInEmployeeInfo(@CurrentUser() employee: Employee) {
    const loggedInEmployeeId = this.getIdFromContext(employee); // Modified to use the new method
    const employee = await this.employeeRepository.getOne({
      conditions: [{ column: 'id', value: loggedInEmployeeId, operator: QueryOperator.EQUAL }],
    });
    return { name: employee.name, role: employee.role };
  }
}