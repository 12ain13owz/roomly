import rateLimit from 'express-rate-limit'

import { errorMessage } from '@/constants/message.const'

// กำหนดการจำกัด: 100 คำขอต่อ 15 นาทีต่อ IP
export const apiLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 60 นาที
  max: 100, // จำกัด 100 คำขอต่อ IP
  message: errorMessage.TOO_MANY_REQUESTS,
})

export const submitLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 60 นาที
  max: 10, // จำกัด 10 คำขอต่อ IP
  message: errorMessage.TOO_MANY_REQUESTS,
})
