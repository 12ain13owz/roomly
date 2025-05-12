export type TurnstileResponse = {
  success: boolean
  'error-codes'?: string[]
  messages?: string[]
  challenge_ts?: string
  hostname?: string
  action?: string
  cdata?: string
}
