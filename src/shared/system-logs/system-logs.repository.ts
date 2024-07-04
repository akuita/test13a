import { EntityRepository, Repository } from 'typeorm';
import { SystemLog } from '../../entities/system_logs';
import { provideCustomRepository } from '../../utils/repository';
import { BaseRepository } from '../base.repository';

@EntityRepository(SystemLog)
export class SystemLogsRepository extends BaseRepository<SystemLog> {
  async logCheckIn(employeeId: number): Promise<void> {
    const log = new SystemLog();
    log.employee_id = employeeId;
    log.timestamp = new Date();
    log.action = 'check-in';
    await this.save(log);
  }
}

export const SystemLogsRepositoryProvider = provideCustomRepository(SystemLog, SystemLogsRepository);