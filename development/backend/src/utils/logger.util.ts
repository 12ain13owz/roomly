import dayjs from 'dayjs'
import logger from 'pino'

const level = 'debug' // fatal, error, warn, info, debug, trace
export const log = logger({
  transport: {
    target: 'pino-pretty',
  },
  level,
  base: {
    pid: false,
  },
  timestamp: () => `,"time":"${dayjs().format()}"`,
})
