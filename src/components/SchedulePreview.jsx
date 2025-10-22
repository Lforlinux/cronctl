import React, { useEffect, useState } from 'react'
import { getCronDescription, getNextRuns } from '../utils/cronParser'

const SchedulePreview = ({ expression, isValid }) => {
  const [nextRuns, setNextRuns] = useState([])
  const [description, setDescription] = useState('')

  useEffect(() => {
    if (isValid && expression) {
      setDescription(getCronDescription(expression))
      const runs = getNextRuns(expression, 5)
      if (runs.isValid) {
        setNextRuns(runs.runs)
      }
    }
  }, [expression, isValid])

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('en-US', {
      weekday: 'short',
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      timeZoneName: 'short'
    }).format(date)
  }

  const getRelativeTime = (date) => {
    const now = new Date()
    const diff = date.getTime() - now.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60))

    if (days > 0) return `in ${days} day${days > 1 ? 's' : ''}`
    if (hours > 0) return `in ${hours} hour${hours > 1 ? 's' : ''}`
    if (minutes > 0) return `in ${minutes} minute${minutes > 1 ? 's' : ''}`
    return 'now'
  }

  if (!isValid) {
    return (
      <div className="card p-6">
        <h3 className="text-xl font-semibold text-white mb-4">Schedule Preview</h3>
        <div className="text-center py-8">
          <div className="status-indicator status-invalid mx-auto mb-4"></div>
          <p className="text-gray-400">Invalid cron expression</p>
        </div>
      </div>
    )
  }

  return (
    <div className="card p-6">
      <h3 className="text-xl font-semibold text-white mb-4">Schedule Preview</h3>
      
      <div className="mb-6">
        <div className="flex items-center mb-2">
          <div className="status-indicator status-valid mr-3"></div>
          <span className="text-green-400 font-medium">Valid Schedule</span>
        </div>
        <p className="text-gray-300">{description}</p>
      </div>

      <div className="schedule-preview">
        <h4 className="text-white font-medium mb-3">Next 5 Executions:</h4>
        <div className="next-runs">
          {nextRuns.map((run, index) => (
            <div key={index} className="next-run-item">
              <div>
                <div className="text-white font-medium">
                  {formatDate(run)}
                </div>
                <div className="text-gray-400 text-sm">
                  {getRelativeTime(run)}
                </div>
              </div>
              <div className="text-primary-300 text-sm font-mono">
                #{index + 1}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default SchedulePreview
