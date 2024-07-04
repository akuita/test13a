import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from 'src/entities/employees';
import { CurrentUser } from 'src/decorators/current-user.decorator';
import { BaseRepository } from 'src/shared/base.repository';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: BaseRepository<Employee>,
  ) {}

  getIdFromContext() {
    const employee = CurrentUser();
    if (!employee || !employee.employee_id) {
      throw new Error('No employee context available');
    }
    return employee.employee_id;
  }

  @CurrentUser()
  async getLoggedInEmployeeInfo() {
    const loggedInEmployeeId = this.getIdFromContext(); // Modified to use the new method
    const employee = await this.employeeRepository.getOne({
      conditions: [{ column: 'id', value: loggedInEmployeeId, operator: 'EQUAL' }],
    });
    return { name: employee.name, role: employee.role };
  }
}