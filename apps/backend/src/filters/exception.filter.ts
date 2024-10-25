import {
    ExceptionFilter,
    Catch,
    ArgumentsHost,
    HttpStatus,
    HttpException,
  } from '@nestjs/common';
  import { Response } from 'express';
  import { Error } from 'mongoose';
  import { MongoError } from 'mongodb';
  
  @Catch()
  export class AllExceptionsFilter implements ExceptionFilter {
    catch(exception: unknown, host: ArgumentsHost) {
      const ctx = host.switchToHttp();
      const response = ctx.getResponse<Response>();
      
      let status = HttpStatus.INTERNAL_SERVER_ERROR;
      let message = 'Internal server error';
  
      // Handle Mongoose Validation Errors
      if (exception instanceof Error.ValidationError) {
        status = HttpStatus.BAD_REQUEST;
        message = Object.values(exception.errors)
          .map(err => err.message)
          .join(', ');
      }
      
      // Handle Mongoose CastError (Invalid ID)
      else if (exception instanceof Error.CastError) {
        status = HttpStatus.BAD_REQUEST;
        message = `Invalid ${exception.path}: ${exception.value}`;
      }
  
      // Handle MongoDB Duplicate Key Error
      else if (exception instanceof MongoError && exception.code === 11000) {
        status = HttpStatus.CONFLICT;
        const field = Object.keys(exception['keyPattern'])[0];
        message = `${field} already exists`;
      }
  
      // Handle NestJS HTTP Exceptions
      else if (exception instanceof HttpException) {
        status = exception.getStatus();
        const response = exception.getResponse() as any;
        message = response.message || exception.message;
      }
  
      // Handle other MongoDB Errors
      else if (exception instanceof MongoError) {
        status = HttpStatus.BAD_REQUEST;
        message = exception.message;
      }
  
      response.status(status).json({
        status,
        message
      });
    }
  }