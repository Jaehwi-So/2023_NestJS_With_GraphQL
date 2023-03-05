import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
  Inject,
  LoggerService,
} from '@nestjs/common';

import { Request, Response } from 'express';

@Catch(HttpException)
export class HttpExceptionFilter implements ExceptionFilter {
  constructor(private readonly logger: LoggerService) {
    //
  }
  catch(exception: HttpException, host: ArgumentsHost) {
    const status = exception.getStatus();
    const message = exception.message;

    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    //Message를 다르게
    if (
      status === HttpStatus.UNAUTHORIZED ||
      status === HttpStatus.NOT_FOUND ||
      status === HttpStatus.CONFLICT
    ) {
      this.logger.warn(
        `[CODE : ${status}] [${request.method} : ${request.url}] / [${message}] `,
      );
    } else {
      this.logger.error(
        `[CODE : ${status}] [${request.method} : ${request.url}] / [${message}] `,
      );
    }

    response.status(status).json({
      statusCode: status,
      message: message,
      path: request.url,
    });
  }
}
