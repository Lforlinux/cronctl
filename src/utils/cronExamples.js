export const cronExamples = [
  {
    title: 'Every minute',
    expression: '* * * * *',
    description: 'Runs every minute',
    category: 'Common'
  },
  {
    title: 'Every 5 minutes',
    expression: '*/5 * * * *',
    description: 'Runs every 5 minutes',
    category: 'Common'
  },
  {
    title: 'Every hour',
    expression: '0 * * * *',
    description: 'Runs at the top of every hour',
    category: 'Common'
  },
  {
    title: 'Every day at midnight',
    expression: '0 0 * * *',
    description: 'Runs every day at midnight',
    category: 'Daily'
  },
  {
    title: 'Every day at 9 AM',
    expression: '0 9 * * *',
    description: 'Runs every day at 9:00 AM',
    category: 'Daily'
  },
  {
    title: 'Every weekday at 9 AM',
    expression: '0 9 * * 1-5',
    description: 'Runs Monday to Friday at 9:00 AM',
    category: 'Workdays'
  },
  {
    title: 'Every weekday at 5 PM',
    expression: '0 17 * * 1-5',
    description: 'Runs Monday to Friday at 5:00 PM',
    category: 'Workdays'
  },
  {
    title: 'Every Sunday at midnight',
    expression: '0 0 * * 0',
    description: 'Runs every Sunday at midnight',
    category: 'Weekly'
  },
  {
    title: 'Every Monday at 9 AM',
    expression: '0 9 * * 1',
    description: 'Runs every Monday at 9:00 AM',
    category: 'Weekly'
  },
  {
    title: 'First day of every month',
    expression: '0 0 1 * *',
    description: 'Runs on the 1st of every month at midnight',
    category: 'Monthly'
  },
  {
    title: 'Last day of every month',
    expression: '0 0 L * *',
    description: 'Runs on the last day of every month at midnight',
    category: 'Monthly'
  },
  {
    title: 'Every 6 hours',
    expression: '0 */6 * * *',
    description: 'Runs every 6 hours',
    category: 'Interval'
  },
  {
    title: 'Every 2 hours during work hours',
    expression: '0 9-17/2 * * 1-5',
    description: 'Runs every 2 hours from 9 AM to 5 PM on weekdays',
    category: 'Workdays'
  },
  {
    title: 'Every 15 minutes during business hours',
    expression: '*/15 9-17 * * 1-5',
    description: 'Runs every 15 minutes from 9 AM to 5 PM on weekdays',
    category: 'Workdays'
  },
  {
    title: 'Backup every Sunday at 2 AM',
    expression: '0 2 * * 0',
    description: 'Runs every Sunday at 2:00 AM (backup time)',
    category: 'Maintenance'
  },
  {
    title: 'System maintenance every Saturday',
    expression: '0 3 * * 6',
    description: 'Runs every Saturday at 3:00 AM',
    category: 'Maintenance'
  },
  {
    title: 'Quarterly reports',
    expression: '0 0 1 1,4,7,10 *',
    description: 'Runs on the 1st of January, April, July, and October',
    category: 'Quarterly'
  },
  {
    title: 'Year-end processing',
    expression: '0 0 1 1 *',
    description: 'Runs on January 1st at midnight',
    category: 'Yearly'
  }
]

export const getExamplesByCategory = () => {
  const categories = {}
  cronExamples.forEach(example => {
    if (!categories[example.category]) {
      categories[example.category] = []
    }
    categories[example.category].push(example)
  })
  return categories
}

export const getPopularExamples = () => {
  return cronExamples.filter(example => 
    ['Every minute', 'Every 5 minutes', 'Every hour', 'Every day at midnight', 'Every weekday at 9 AM'].includes(example.title)
  )
}
