/* eslint-disable no-process-env */
/* eslint-disable security/detect-object-injection */

import { z } from 'zod'

import { AppConfig } from '@/types/config.type'

// Define environment variable schema with zod
const envSchema = z.object({
  PORT: z
    .string()
    .optional()
    .transform((val) => Number(val))
    .pipe(z.number().int().positive())
    .default('3000'),
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  LINE_CHANNEL_ACCESS_TOKEN: z.string(),
  LINE_CHANNEL_SECRET: z.string(),
  LINE_GROUP_ID: z.string(),
})

// Parse and validate environment variables
const env = envSchema.parse(process.env)

// Define configuration based on environment
const config: Readonly<AppConfig> = Object.freeze({
  port: env.PORT,
  node_env: env.NODE_ENV,
  channelAccessToken: env.LINE_CHANNEL_ACCESS_TOKEN,
  channelSecret: env.LINE_CHANNEL_SECRET,
  groupId: env.LINE_GROUP_ID,
})

export function getConfig<K extends keyof AppConfig>(key: K): AppConfig[K] {
  return config[key]
}
