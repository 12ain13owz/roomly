import { NextFunction, Request, Response, Router } from 'express'

import { AppError } from '@/utils/error-handling.util'

const router = Router()

router.get('/', (_req: Request, res: Response, next: NextFunction) => {
  try {
    res.json({ meeeage: 'ok' })
  } catch (error) {
    next(error)
  }
})

router.get('/error', (_req: Request, _res: Response, next: NextFunction) => {
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
})

export default router
