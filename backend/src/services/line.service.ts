import { messagingApi } from '@line/bot-sdk'

import { getConfig } from '@/config'
import { CondoType } from '@/schemas/condo.schema'
import { LineConfig } from '@/types/line.type'
import { AppError } from '@/utils/error-handling.util'

const lineConfig: LineConfig = {
  channelSecret: getConfig('channelSecret'),
  channelAccessToken: getConfig('channelAccessToken'),
  groupId: getConfig('groupId'),
}

const client = new messagingApi.MessagingApiClient({
  channelAccessToken: lineConfig.channelAccessToken,
})

async function sendMessageToGroup(message: string): Promise<boolean> {
  try {
    await client.pushMessage({
      to: lineConfig.groupId,
      messages: [{ type: 'text', text: message }],
    })
    return true
  } catch (error) {
    throw new AppError('Failed to send message', 400, 'MEDIUM', {
      functionName: 'sendMessageToGroup',
      additionalData: { error },
    })
  }
}

function formatMessage(data: CondoType['register']): string {
  const {
    fullName,
    phoneNumber,
    email,
    lineId,
    address,
    subDistrict,
    district,
    province,
    postalCode,
  } = data

  // Build address string, only including non-empty fields
  const addressParts = [
    address && `ที่อยู่: ${address}`,
    subDistrict && `แขวง: ${subDistrict}`,
    district && `เขต: ${district}`,
    province && `จังหวัด: ${province}`,
    postalCode && `รหัสไปรษณีย์: ${postalCode}`,
  ].filter(Boolean) // Remove empty fields

  // Combine all message parts
  const messageLines = [
    '📋 New Condo',
    '─────────────────',
    `ชื่อ: ${fullName}`,
    `เบอร์: ${phoneNumber}`,
    email ? `อีเมล: ${email}` : 'Email: N/A',
    lineId ? `Line ID: ${lineId}` : 'Line ID: N/A',
    addressParts.length > 0 ? '🏠 รายละเอียด' : null,
    ...addressParts,
    '─────────────────',
  ].filter(Boolean) // Remove null/empty lines

  // Join lines with newlines for LINE's chat display
  return messageLines.join('\n')
}

export const lineService = {
  sendMessageToGroup,
  formatMessage,
}
