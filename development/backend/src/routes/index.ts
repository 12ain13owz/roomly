import { NextFunction, Request, Response, Router } from 'express'

import health from './health.routes'

const router = Router()

router.get('/', (_req: Request, res: Response, _next: NextFunction) => {
  res.json({ message: 'Hello World!' })
})
router.use('/health', health)

export default router
