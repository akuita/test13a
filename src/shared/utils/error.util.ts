import { Injectable } from '@nestjs/common';
import { EmailService } from '../email/email.service';
import { Logger } from '@nestjs/common';

@Injectable()
export class ErrorUtil {
  private readonly logger = new Logger(ErrorUtil.name);

  constructor(private readonly emailService: EmailService) {}

  async handleCheckInError(employeeId: number): Promise<{ statusCode: number; message: string }> {
    try {
      // Log the error details
      this.logger.error(`Check-in error for employee ID: ${employeeId}`);

      // Send an email notification to the support team
      await this.emailService.sendMail({
        to: 'support@example.com',
        subject: 'Check-in Error Notification',
        template: 'error-notification', // Assuming there is a template named 'error-notification'
        context: {
          employeeId: employeeId,
        },
      });

      // Return an error response object
      return {
        statusCode: 500,
        message: 'An error occurred during check-in. Please retry or contact support.',
      };
    } catch (error) {
      this.logger.error(`An unexpected error occurred while handling check-in error: ${error.message}`);
      return {
        statusCode: 500,
        message: 'An unexpected error occurred. Please contact support.',
      };
    }
  }
}