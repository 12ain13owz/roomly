export type AppConfig = {
  port: number
  node_env: 'development' | 'production'
  channelAccessToken: string
  channelSecret: string
  groupId: string
  siteKey: string
  secretKey: string
  turnstileUrl: string
}
