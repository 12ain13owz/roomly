export const severityToLogLevel = {
  LOW: 'info',
  MEDIUM: 'warn',
  HIGH: 'error',
  CRITICAL: 'crit',
}

export const COLORS = {
  string: '38;2;241;250;140', // #F1FA8C
  number: '38;2;127;255;212', // #7FFFD4
  boolean: '38;2;250;140;208', // #FA8CD0
  date: '38;2;0;180;180', // #7FFFD4
  null: '38;2;0;64;128', // #004080
  undefined: '38;2;85;85;85', // #555555
  field: '38;2;121;192;255', // #79C0FF
  function: '38;2;210;168;255', // #D2A8FF
  other: '38;2;255;255;255', // #FFFFFF
  info: '38;2;52;199;89', // #34C759 (LOW)
  warn: '38;2;255;149;0', // #FF9500 (MEDIUM)
  error: '38;2;255;59;48', // #FF3B30 (HIGH)
  crit: '38;2;175;82;222', // #AF52DE (CRITICAL)
}
