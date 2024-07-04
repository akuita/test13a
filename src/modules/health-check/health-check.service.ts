import { Injectable } from '@nestjs/common';
import { formatDateTime } from 'src/utils/transform';

@Injectable()
export class HealthCheckService {
  getCurrentDateTime(): string {
    const now = new Date();
    return formatDateTime(now);
  }
}