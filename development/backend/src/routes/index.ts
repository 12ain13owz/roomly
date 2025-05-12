import { Router } from 'express'

import condoRoutes from './condo.routes'
import healthRoutes from './health.routes'

const router = Router()

router.use('/health', healthRoutes)
router.use('/api/condo', condoRoutes)

export default router
