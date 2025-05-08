import { Router } from 'express'

import { healthController } from '@/controllers/health.controller'

const router = Router()

router.get('/', healthController.healthSuccess)
router.get('/error', healthController.healthError)

export default router
