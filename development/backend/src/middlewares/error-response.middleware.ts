import { NextFunction, Request, Response } from 'express'

import { getConfig } from '@/config'
import { AppError, ErrorLogger } from '@/utils/error-handling.util'

export const errorHandler = async (
  error: AppError | Error,
  req: Request,
  res: Response,
  _next: NextFunction
) => {
  try {
    if (error instanceof AppError) error.addRequestContext(req)

    const errorLog = ErrorLogger.log(error, {
      functionName:
        (error as AppError).context?.functionName || 'Unknow Function',
      requestContext: {
        method: req.method,
        url: req.url,
        baseUrl: req.baseUrl,
        path: req.path,
        body: req.body as Record<string, unknown>,
        params: req.params,
        query: req.query,
      },
    })

    const response = {
      status: error instanceof AppError ? error.status : 500,
      message: error.message,
      error: getConfig('node_env') === 'development' ? errorLog : undefined,
    }

    res.status(response.status).json({ message: response.message })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Internal Server Error' })
  }
}
