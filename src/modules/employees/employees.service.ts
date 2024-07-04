import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Employee } from '../../entities/employees';
import { BaseRepository } from '../../shared/base.repository';

@Injectable()
export class EmployeeService {
  constructor(
    @InjectRepository(Employee)
    private employeeRepository: BaseRepository<Employee>,
  ) {}

  async getEmployeeDetails(employeeId: number): Promise<{ name: string; role: string; }> {
    const employee = await this.employeeRepository.getOne({
      conditions: [
        { column: 'id', value: employeeId, operator: 'EQUAL', whereType: 'WHERE' },
        { column: 'account_status', value: 'active', operator: 'EQUAL', whereType: 'WHERE_AND' },
      ],
    });

    if (!employee) {
      throw new NotFoundException(`Employee with ID ${employeeId} not found or not active.`);
    }

    return { name: employee.name, role: employee.role };
  }
}