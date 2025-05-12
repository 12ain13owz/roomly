import { Router } from 'express'

import { condoController } from '@/controllers/condo.controller'
import { submitLimiter } from '@/middlewares/rate-limit.middleware'
import { validate } from '@/middlewares/validate.middleware'
import { verifyTurnstileToken } from '@/middlewares/verify.middleware'
import { condoSchema } from '@/schemas/condo.schema'

const router = Router()

router.post(
  '/register',
  [verifyTurnstileToken, submitLimiter, validate(condoSchema.register)],
  condoController.registerCondoSale
)

export default router
