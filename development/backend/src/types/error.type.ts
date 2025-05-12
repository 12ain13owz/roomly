export type RequestContext = {
  method: string
  url: string
  baseUrl: string
  path: string
  params?: Record<string, unknown>
  query?: Record<string, unknown>
  body?: Record<string, unknown>
}

export type ErrorContext = {
  functionName: string
  requestContext?: RequestContext
  additionalData?: Record<string, unknown>
}

export type ErrorSeverity = 'LOW' | 'MEDIUM' | 'HIGH' | 'CRITICAL'
export type LogLevel = 'info' | 'warn' | 'error' | 'crit'
