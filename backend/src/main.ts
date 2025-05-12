import cors, { CorsOptions } from 'cors'
import dotenv from 'dotenv'
dotenv.config()
import express from 'express'
import helmet from 'helmet'
import morgan from 'morgan'

import { getConfig } from './config'
import { errorHandler } from './middlewares/error-response.middleware'
import routes from './routes'
import { logger } from './utils/logger.util'

const app = express()
const port = getConfig('port')
const whiteList = getConfig('whiteList').split(',')
const corsOptions: CorsOptions = {
  origin: whiteList,
  optionsSuccessStatus: 200,
}

app.use(cors(corsOptions))
app.use(helmet())
app.use(morgan('dev'))
app.use(express.json())

app.use(routes)
app.use(errorHandler)

const main = () => {
  try {
    logger.info(`Server listening at http://localhost:${port}`)
  } catch (error) {
    console.error(error)
    process.exit(1)
  }
}

app.listen(port, main)
