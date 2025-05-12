import { NextFunction, Request, Response } from 'express'

import { CondoType } from '@/schemas/condo.schema'
import { lineService } from '@/services/line.service'

async function registerCondoSale(
  req: Request<unknown, unknown, CondoType['register']>,
  res: Response,
  next: NextFunction
) {
  try {
    const message = lineService.formatMessage(req.body)
    await lineService.sendMessageToGroup(message)
    res.json({
      status: 'success',
      message: 'Condo sale registered successfully',
    })
  } catch (error) {
    next(error)
  }
}

export const condoController = {
  registerCondoSale,
}
