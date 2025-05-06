import { Request } from 'express'

import { severityToLogLevel } from '@/constants/severity.const'
import { ErrorContext, ErrorSeverity, LogLevel } from '@/types/error.type'

import { log } from './logger.util'

export class AppError extends Error {
  constructor(
    message: string,
    public status: number,
    public severity: ErrorSeverity,
    public context: ErrorContext
  ) {
    super(message)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }

  addRequestContext(req: Request) {
    this.context.requestContext = {
      method: req.method,
      url: req.originalUrl,
      baseUrl: req.baseUrl,
      path: req.path,
      body: req.body as Record<string, unknown>,
      params: req.params,
      query: req.query,
    }

    return this
  }
}

export class ErrorFactory {
  static notFound(
    message: string, // Not Found
    functionName: string,
    additionalData?: Record<string, unknown>
  ) {
    return new AppError(message, 404, 'LOW', {
      functionName,
      additionalData,
    })
  }

  static badRequest(
    message: string, // Bad Request
    functionName: string,
    additionalData?: Record<string, unknown>
  ) {
    return new AppError(message, 400, 'MEDIUM', {
      functionName,
      additionalData,
    })
  }

  static unauthorized(
    message: string, // Unauthorized
    functionName: string,
    additionalData?: Record<string, unknown>
  ) {
    return new AppError(message, 401, 'HIGH', {
      functionName,
      additionalData,
    })
  }

  static serverError(
    message: string, //Internal Server Error
    functionName: string,
    additionalData?: Record<string, unknown>
  ) {
    return new AppError(message, 500, 'CRITICAL', {
      functionName,
      additionalData,
    })
  }
}

export class ErrorLogger {
  private static formatErrorLog(
    error: AppError | Error,
    additionalData?: Record<string, unknown>
  ) {
    const baseLog = {
      timestamp: new Date().toISOString(),
      name: error.name,
      message: error.message,
    }

    if (error instanceof AppError)
      return {
        ...baseLog,
        status: error.status,
        severity: error.severity,
        ...error.context,
        ...additionalData,
      }

    return {
      ...baseLog,
      status: 500,
      severity: 'HIGH',
      ...additionalData,
    }
  }

  static log(
    error: AppError | Error,
    additionalContext?: Partial<ErrorContext>
  ) {
    const errorLog = this.formatErrorLog(error, additionalContext)
    const level: LogLevel =
      error instanceof AppError && error.severity
        ? (severityToLogLevel[error.severity] as LogLevel) || 'error'
        : 'error'

    switch (level) {
      case 'fatal':
        log.fatal(errorLog)
        break
      case 'error':
        log.error(errorLog)
        break
      case 'warn':
        log.warn(errorLog)
        break
      case 'info':
        log.info(errorLog)
        break
      case 'debug':
        log.debug(errorLog)
        break
      case 'trace':
        log.trace(errorLog)
        break
      default:
        log.error(errorLog)
    }

    return errorLog
  }
}
