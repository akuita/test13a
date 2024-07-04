import { Injectable } from '@nestjs/common';
import { format } from 'date-fns';

@Injectable()
export class HealthCheckService {
  getCurrentDateTime(): string {
    const now = new Date();
    return format(now, "yyyy-MM-dd'T'HH:mm:ss.SSSxxx");
  }
}