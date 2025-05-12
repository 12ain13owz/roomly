import { AppConfig } from './config.type'

export type LineConfig = Pick<
  AppConfig,
  'channelSecret' | 'channelAccessToken' | 'groupId'
>
