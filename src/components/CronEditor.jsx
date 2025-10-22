import React, { useState, useEffect } from 'react'
import { parseCronExpression, getFieldDescription } from '../utils/cronParser'

const CronEditor = ({ expression, onExpressionChange, isValid, error }) => {
  const [fields, setFields] = useState({
    minute: '',
    hour: '',
    dayOfMonth: '',
    month: '',
    dayOfWeek: ''
  })

  useEffect(() => {
    if (expression) {
      const parts = expression.split(' ')
      if (parts.length === 5) {
        setFields({
          minute: parts[0],
          hour: parts[1],
          dayOfMonth: parts[2],
          month: parts[3],
          dayOfWeek: parts[4]
        })
      }
    }
  }, [expression])

  const handleFieldChange = (field, value) => {
    const newFields = { ...fields, [field]: value }
    setFields(newFields)
    onExpressionChange(Object.values(newFields).join(' '))
  }

  const fieldLabels = {
    minute: 'Minute',
    hour: 'Hour',
    dayOfMonth: 'Day of Month',
    month: 'Month',
    dayOfWeek: 'Day of Week'
  }

  const fieldPlaceholders = {
    minute: '0-59 or *',
    hour: '0-23 or *',
    dayOfMonth: '1-31 or *',
    month: '1-12 or *',
    dayOfWeek: '0-7 or *'
  }

  return (
    <div className="card p-6">
      <h3 className="text-xl font-semibold text-white mb-4">Cron Expression Editor</h3>
      
      <div className="cron-grid">
        {Object.entries(fields).map(([field, value]) => (
          <div key={field} className="cron-cell">
            <label className="block text-sm font-medium text-gray-300 mb-2">
              {fieldLabels[field]}
            </label>
            <input
              type="text"
              value={value}
              onChange={(e) => handleFieldChange(field, e.target.value)}
              placeholder={fieldPlaceholders[field]}
              className={`cron-field ${!isValid && error ? 'border-red-500' : ''}`}
            />
            <div className="text-xs text-gray-400 mt-1">
              {getFieldDescription(field, value)}
            </div>
          </div>
        ))}
      </div>

      {!isValid && error && (
        <div className="mt-4 p-3 bg-red-600/20 border border-red-500/50 rounded-lg">
          <p className="text-red-300 text-sm">{error}</p>
        </div>
      )}

      <div className="mt-4 p-4 bg-white/5 rounded-lg">
        <div className="flex items-center justify-between">
          <span className="text-sm text-gray-300">Current Expression:</span>
          <code className="text-primary-300 font-mono text-sm bg-white/10 px-2 py-1 rounded">
            {Object.values(fields).join(' ')}
          </code>
        </div>
      </div>
    </div>
  )
}

export default CronEditor
