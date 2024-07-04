import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from '../../entities/employees';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { QueryOperator, QueryWhereType } from '../../query-operator.enum';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: BaseRepository<Employee>,
  ) {}

  getIdFromContext(@CurrentUser() currentEmployee: Employee) {
    if (!currentEmployee || !currentEmployee.id) {
      throw new Error('No employee context available');
    }
    return currentEmployee.id;
  }

  async getLoggedInEmployeeInfo(@CurrentUser() employee: Employee) {
    const loggedInEmployeeId = this.getIdFromContext(employee);
    const loggedInEmployee = await this.employeeRepository.getOne({
      conditions: [{ column: 'id', value: loggedInEmployeeId, operator: QueryOperator.EQUAL, whereType: QueryWhereType.AND }],
    });
    return { name: loggedInEmployee.name, role: loggedInEmployee.role };
  }
}