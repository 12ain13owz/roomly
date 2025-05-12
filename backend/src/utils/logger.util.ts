import dayjs from 'dayjs'
import winston from 'winston'

import { COLORS } from '@/constants/logger.const'

// ฟังก์ชันสำหรับสร้าง ANSI color string
function applyColor(value: unknown, colorCode: string): string {
  return `\x1b[${colorCode}m${String(value)}\x1b[0m`
}

//ฟังก์ชันสำหรับจัดการการแสดงผล Array
function formatArray(arr: unknown[], indent = 0): string {
  if (arr.length === 0) return '[]'

  const indentStr = ' '.repeat(indent)
  let result = '['

  arr.forEach((item, index) => {
    const formattedValue = formatAny(item, indent + 2)
    result += `\n${indentStr}  ${formattedValue}`
    if (index < arr.length - 1) result += ','
  })

  result += `\n${indentStr}]`
  return result
}

// ฟังก์ชันสำหรับตรวจสอบว่า key เป็น property ของ object จริงหรือไม่ ช่วยป้องกัน prototype pollution
function safeHasOwnProperty(
  obj: Record<string, unknown>,
  key: string
): boolean {
  return Object.prototype.hasOwnProperty.call(obj, key)
}

// ฟังก์ชันสำหรับดึงค่า property จาก object อย่างปลอดภัย
function safeGetProperty(obj: Record<string, unknown>, key: string): unknown {
  if (safeHasOwnProperty(obj, key)) {
    // ใช้ Object.getOwnPropertyDescriptor แทน direct access
    const descriptor = Object.getOwnPropertyDescriptor(obj, key)
    return descriptor ? descriptor.value : undefined
  }
  return undefined
}

// ฟังก์ชันสำหรับจัดการการแสดงผล Object
function formatObject(obj: Record<string, unknown>, indent = 0): string {
  // ตรวจสอบ object ว่าง
  const ownKeys = Object.keys(obj)
  if (ownKeys.length === 0) return '{}'

  const indentStr = ' '.repeat(indent)
  let result = '{'

  ownKeys.forEach((key, index) => {
    // ใช้ safeGetProperty แทนการเข้าถึงโดยตรง
    const value = safeGetProperty(obj, key)
    const formattedValue = formatAny(value, indent + 2)

    result += `\n${indentStr}  ${applyColor(
      `"${key}"`,
      COLORS.field
    )}: ${formattedValue}`
    if (index < ownKeys.length - 1) result += ','
  })

  result += `\n${indentStr}}`
  return result
}

// ฟังก์ชันสำหรับจัดการการแสดงผลค่าพื้นฐาน
function formatPrimitive(value: unknown): string {
  if (typeof value === 'string') return applyColor(`"${value}"`, COLORS.string)
  if (typeof value === 'number') return applyColor(value, COLORS.number)
  if (typeof value === 'boolean') return applyColor(value, COLORS.boolean)
  if (typeof value === 'function')
    return applyColor('function', COLORS.function)
  if (value === undefined) return applyColor('undefined', COLORS.undefined)
  if (value === null) return applyColor('null', COLORS.null)
  if (value instanceof Date) return applyColor(value, COLORS.date)

  return String(value as unknown)
}

// ฟังก์ชันหลักสำหรับจัดการการแสดงผลข้อมูลทุกประเภท
function formatAny(value: unknown, indent = 0): string {
  if (value instanceof Date) return formatPrimitive(value)
  if (Array.isArray(value)) return formatArray(value, indent)
  if (typeof value === 'object' && value !== null)
    return formatObject(value as Record<string, unknown>, indent)

  return formatPrimitive(value)
}

// ฟังก์ชันสำหรับจัดการกับ color code ของ level ต่างๆ
function getLevelColor(level: string): string {
  // ใช้ type guard เพื่อตรวจสอบว่า level มีอยู่ใน COLORS หรือไม่
  const validLevelKeys = ['crit', 'error', 'warn', 'info'] as const
  type LevelKey = (typeof validLevelKeys)[number]

  if (validLevelKeys.includes(level as LevelKey)) {
    return COLORS[level as LevelKey]
  }

  return COLORS.info // default fallback
}

// สร้าง custom format สำหรับ Winston
const colorizedFormat = winston.format.printf((info) => {
  const timestamp = dayjs().format('HH:mm:ss.SSS')
  const time = `[${timestamp}]`
  const levelUpper = info.level.toUpperCase()
  const levelColor = getLevelColor(info.level)
  const formattedLevel = applyColor(`${levelUpper}:`, levelColor)

  // จัดการ message ตามประเภท
  const message = info.message
  if (Array.isArray(message)) {
    const formattedMessage = message.map((item) => formatAny(item)).join(' ')
    return `${time} ${formattedLevel} ${formattedMessage}`
  }

  const formattedMessage = formatAny(message)
  return `${time} ${formattedLevel} ${formattedMessage}`
})

export const logger = winston.createLogger({
  level: 'info',
  levels: {
    crit: 0,
    error: 1,
    warn: 2,
    info: 3,
  },
  format: colorizedFormat,
  transports: [new winston.transports.Console()],
})
