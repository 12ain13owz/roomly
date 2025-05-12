export type AppConfig = {
  port: number
  node_env: 'development' | 'production'
  channelAccessToken: string
  channelSecret: string
  groupId: string
}
