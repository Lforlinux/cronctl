import { parseExpression } from 'cron-parser'

export const validateCronExpression = (expression) => {
  try {
    parseExpression(expression)
    return { isValid: true, error: null }
  } catch (error) {
    return { isValid: false, error: error.message }
  }
}

export const parseCronExpression = (expression) => {
  try {
    const parser = parseExpression(expression)
    return {
      isValid: true,
      parser,
      nextRun: parser.next().toDate(),
      fields: {
        minute: expression.split(' ')[0],
        hour: expression.split(' ')[1],
        dayOfMonth: expression.split(' ')[2],
        month: expression.split(' ')[3],
        dayOfWeek: expression.split(' ')[4]
      }
    }
  } catch (error) {
    return {
      isValid: false,
      error: error.message,
      fields: {
        minute: '',
        hour: '',
        dayOfMonth: '',
        month: '',
        dayOfWeek: ''
      }
    }
  }
}

export const getNextRuns = (expression, count = 5) => {
  try {
    const parser = parseExpression(expression)
    const runs = []
    
    for (let i = 0; i < count; i++) {
      runs.push(parser.next().toDate())
    }
    
    return { isValid: true, runs }
  } catch (error) {
    return { isValid: false, error: error.message, runs: [] }
  }
}

export const getCronDescription = (expression) => {
  const fields = expression.split(' ')
  if (fields.length !== 5) return 'Invalid cron expression'
  
  const [minute, hour, dayOfMonth, month, dayOfWeek] = fields
  
  // Handle special cases first
  if (expression === '0 0 * * *') return 'Every day at midnight'
  if (expression === '0 0 * * 0') return 'Every Sunday at midnight'
  if (expression === '0 0 1 * *') return 'Every month on the 1st at midnight'
  if (expression === '0 0 1 1 *') return 'Every year on January 1st at midnight'
  if (expression === '*/5 * * * *') return 'Every 5 minutes'
  if (expression === '0 */2 * * *') return 'Every 2 hours'
  if (expression === '0 9 * * 1-5') return 'Every weekday at 9 AM'
  
  // Build comprehensive description
  let description = ''
  
  // Time part
  if (minute === '0' && hour !== '*') {
    description = `At ${hour}:00`
  } else if (minute !== '*' && hour !== '*') {
    description = `At ${hour}:${minute.padStart(2, '0')}`
  } else if (minute !== '*' && hour === '*') {
    description = `Every hour at minute ${minute}`
  } else if (minute === '0' && hour === '*') {
    description = 'Every hour at the top of the hour'
  } else if (minute === '*' && hour === '*') {
    description = 'Every minute'
  } else {
    description = `At ${hour}:${minute}`
  }
  
  // Day part
  if (dayOfMonth === '*' && dayOfWeek === '*' && month === '*') {
    description += ' every day'
  } else if (dayOfMonth !== '*' && dayOfWeek === '*' && month === '*') {
    description += ` on the ${dayOfMonth}${getOrdinalSuffix(dayOfMonth)} of every month`
  } else if (dayOfMonth === '*' && dayOfWeek !== '*' && month === '*') {
    const dayNames = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
    if (dayOfWeek.includes(',')) {
      const days = dayOfWeek.split(',').map(d => dayNames[parseInt(d)]).join(', ')
      description += ` on ${days}`
    } else if (dayOfWeek.includes('-')) {
      const [start, end] = dayOfWeek.split('-')
      description += ` from ${dayNames[parseInt(start)]} to ${dayNames[parseInt(end)]}`
    } else {
      description += ` on ${dayNames[parseInt(dayOfWeek)]}`
    }
  } else if (dayOfMonth === '*' && dayOfWeek === '*' && month !== '*') {
    const monthNames = ['', 'January', 'February', 'March', 'April', 'May', 'June', 
                       'July', 'August', 'September', 'October', 'November', 'December']
    if (month.includes(',')) {
      const months = month.split(',').map(m => monthNames[parseInt(m)]).join(', ')
      description += ` in ${months}`
    } else {
      description += ` in ${monthNames[parseInt(month)]}`
    }
  } else {
    description += ' (custom schedule)'
  }
  
  return description
}

const getOrdinalSuffix = (num) => {
  const j = num % 10
  const k = num % 100
  if (j === 1 && k !== 11) return 'st'
  if (j === 2 && k !== 12) return 'nd'
  if (j === 3 && k !== 13) return 'rd'
  return 'th'
}

export const getFieldDescription = (field, value) => {
  const descriptions = {
    minute: {
      '*': 'Every minute',
      '0': 'At minute 0',
      '*/5': 'Every 5 minutes',
      '*/15': 'Every 15 minutes',
      '*/30': 'Every 30 minutes'
    },
    hour: {
      '*': 'Every hour',
      '0': 'At midnight',
      '12': 'At noon',
      '*/2': 'Every 2 hours',
      '*/6': 'Every 6 hours'
    },
    dayOfMonth: {
      '*': 'Every day of the month',
      '1': 'On the 1st',
      '15': 'On the 15th',
      '*/7': 'Every 7 days'
    },
    month: {
      '*': 'Every month',
      '1': 'In January',
      '12': 'In December',
      '*/3': 'Every 3 months'
    },
    dayOfWeek: {
      '*': 'Every day of the week',
      '0': 'On Sunday',
      '1': 'On Monday',
      '1-5': 'Monday to Friday',
      '6,0': 'Weekends'
    }
  }
  
  return descriptions[field]?.[value] || `Custom: ${value}`
}
