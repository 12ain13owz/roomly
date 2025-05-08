import { NextFunction, Request, Response } from 'express'

import { AppError } from '@/utils/error-handling.util'

function healthSuccess(_req: Request, res: Response, next: NextFunction) {
  try {
    res.json({ message: 'ok' })
  } catch (error) {
    next(error)
  }
}

function healthError(_req: Request, _res: Response, next: NextFunction) {
  try {
    throw new AppError('Test error function', 400, 'LOW', {
      functionName: 'Health Test Error',
      additionalData: {
        userId: 'Test Health User ID',
      },
    })
  } catch (error) {
    next(error)
  }
}

export const healthController = {
  healthSuccess,
  healthError,
}
