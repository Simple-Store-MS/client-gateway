import { ArgumentsHost, Catch, ExceptionFilter } from '@nestjs/common';
import e, { Response } from 'express';

interface CustomError {
  statusCode?: number;
  message?: string;
}

@Catch()
export class AppExceptionsFilter implements ExceptionFilter {
  catch(exception: Error, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    let customError = {
      statusCode: (exception as CustomError).statusCode || 500,
      message: (exception as CustomError).message || 'Internal server error',
    };

    if ('response' in exception) {
      const responseError = exception.response as {
        statusCode?: number;
        message?: string[];
      };

      customError = {
        statusCode: responseError.statusCode || 500,
        message: responseError.message?.join(', ') || 'Internal server error',
      };
    }

    response.status(customError.statusCode).json({
      statusCode: customError.statusCode,
      message: customError.message,
    });
  }
}
