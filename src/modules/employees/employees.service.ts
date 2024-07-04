import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from 'src/entities/employees';
import { BaseRepository } from 'src/shared/base.repository';
import { CurrentUser } from 'src/decorators/current-user.decorator';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: BaseRepository<Employee>,
  ) {}

  @CurrentUser()
  async getLoggedInEmployeeInfo() {
    const loggedInEmployeeId = this.employeeRepository.getIdFromContext(); // Assuming this method exists to get the ID from the context
    const employee = await this.employeeRepository.getOne({
      conditions: [{ column: 'id', value: loggedInEmployeeId, operator: 'EQUAL' }],
    });
    return { name: employee.name, role: employee.role };
  }
}