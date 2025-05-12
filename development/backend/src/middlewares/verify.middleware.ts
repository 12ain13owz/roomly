import dotenv from 'dotenv'
dotenv.config()
import { NextFunction, Request, Response } from 'express'

import { getConfig } from '@/config'
import { TurnstileResponse } from '@/types/turnstile.type'
import { AppError } from '@/utils/error-handling.util'

export const verifyTurnstileToken = async (
  req: Request,
  _res: Response,
  next: NextFunction
) => {
  try {
    const token = req.headers['x-cloudflare-token']
    if (
      !token ||
      (typeof token !== 'string' && !Array.isArray(token)) ||
      (typeof token === 'string' && token.length <= 0)
    ) {
      throw new AppError(
        'Unauthorized! Invalid or missing token.',
        401,
        'LOW',
        { functionName: 'verifyTurnstileToken' }
      )
    }
    const tokenString = typeof token === 'string' ? token : token[0]

    const secretKey = getConfig('secretKey')
    const formData = new FormData()
    formData.append('secret', secretKey)
    formData.append('response', tokenString)

    const url = getConfig('turnstileUrl')
    const result = await fetch(url, { body: formData, method: 'POST' })
    if (!result.ok) {
      throw new AppError(
        `Turnstile API error: ${result.statusText}`,
        result.status,
        'MEDIUM',
        { functionName: 'verifyTurnstileToken' }
      )
    }

    const outcome = (await result.json()) as TurnstileResponse
    if (!outcome.success) {
      throw new AppError(
        'Unauthorized! Turnstile verification failed.',
        401,
        'LOW',
        { functionName: 'verifyTurnstileToken' }
      )
    }

    next()
  } catch (error) {
    next(error)
  }
}
