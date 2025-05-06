import dayjs from 'dayjs'
import pino from 'pino'

const level = 'debug' // fatal, error, warn, info, debug, trace
export const log = pino({
  transport: {
    target: 'pino-pretty',
    options: { colorize: true },
  },
  level,
  base: { pid: false },
  timestamp: () => `,"time":"${dayjs().format()}"`,
})
