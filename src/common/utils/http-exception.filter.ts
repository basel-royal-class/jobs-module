// http-exception.filter.ts
import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpException,
    HttpStatus,
    Logger,
  } from '@nestjs/common';
  import { Request, Response } from 'express';
  
  @Catch()
  export class HttpExceptionFilter implements ExceptionFilter {
    private readonly logger = new Logger(HttpExceptionFilter.name);
  
    catch(exception: unknown, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      const request = ctx.getRequest<Request>();
      
      let status = HttpStatus.INTERNAL_SERVER_ERROR;
      let message = 'Internal server error';
      let errorName = 'InternalServerError';
      
      if (exception instanceof HttpException) {
        status = exception.getStatus();
        const errorResponse = exception.getResponse();
        message = 
          typeof errorResponse === 'object' && 'message' in errorResponse
            ? (errorResponse as any).message
            : errorResponse;
        errorName = exception.constructor.name;
      }
      
      const errorResponse = {
        success: false,
        statusCode: status,
        timestamp: new Date().toISOString(),
        path: request.url,
        method: request.method,
        errorName,
        message,
      };
  
      this.logger.error(
        `${request.method} ${request.url} ${status}: ${message}`,
        exception instanceof Error ? exception.stack : 'No stack trace',
      );
  
      response.status(status).json(errorResponse);
    }
  }