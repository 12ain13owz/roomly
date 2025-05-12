import { NextFunction, Request, Response } from 'express'
import { AnyZodObject, ZodError } from 'zod'

import { AppError } from './../utils/error-handling.util'

export const validate =
  (schema: AnyZodObject) =>
  (req: Request<unknown>, res: Response, next: NextFunction) => {
    res.locals.func = 'validate'

    try {
      schema.parse({
        body: req.body as unknown,
        query: req.query,
        params: req.params,
      })
      next()
    } catch (error) {
      let message = 'Validate Error'
      let status = 500

      if (error instanceof ZodError) {
        message = error.issues.map((issue) => issue.message).join(', ')
        status = 400
      }

      const appError = new AppError(message, status, 'LOW', {
        functionName: 'Validate Middleware',
      })
      next(appError)
    }
  }
