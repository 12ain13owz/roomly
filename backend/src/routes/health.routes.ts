import { Router } from 'express'

import { healthController } from '@/controllers/health.controller'
import { apiLimiter } from '@/middlewares/rate-limit.middleware'

const router = Router()

router.get('/', apiLimiter, healthController.healthSuccess)
router.get('/error', apiLimiter, healthController.healthError)

export default router
