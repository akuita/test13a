import { Injectable } from '@nestjs/common';
import { formatDateTime } from 'src/utils/transform';

@Injectable()
export class HealthCheckService {
  getCurrentDateTime(): string {
    return formatDateTime(new Date());
  }
}