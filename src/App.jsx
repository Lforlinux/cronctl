import React, { useState, useEffect } from 'react'
import CronEditor from './components/CronEditor'
import SchedulePreview from './components/SchedulePreview'
import CronExamples from './components/CronExamples'
import { validateCronExpression, parseCronExpression, getCronDescription } from './utils/cronParser'

function App() {
  const [cronExpression, setCronExpression] = useState('0 9 * * 1-5')
  const [isValid, setIsValid] = useState(true)
  const [error, setError] = useState(null)

  const handleExpressionChange = (expression) => {
    setCronExpression(expression)
    
    const validation = validateCronExpression(expression)
    setIsValid(validation.isValid)
    setError(validation.error)
  }

  const handleExampleSelect = (expression) => {
    setCronExpression(expression)
    handleExpressionChange(expression)
  }

  const handleClear = () => {
    setCronExpression('')
    setIsValid(true)
    setError(null)
  }

  return (
    <div className="min-h-screen flex flex-col">
      
      <div className="container mx-auto px-4 py-8 flex-1">
        <header className="text-center mb-8">
          <h1 className="text-5xl font-bold text-white mb-4 text-shadow-lg">
            cronctl
          </h1>
          <p className="text-xl text-white/90 text-shadow mb-2">
            Cron expression analyzer
          </p>
        </header>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 mb-8">
          <div className="space-y-6">
            {/* Main Cron Expression Input */}
            <div className="card p-6">
              <h3 className="text-xl font-semibold text-white mb-4">Enter Your Cron Expression</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Paste your cron expression here:
                  </label>
                  <input
                    type="text"
                    value={cronExpression}
                    onChange={(e) => handleExpressionChange(e.target.value)}
                    placeholder="0 9 * * 1-5"
                    className="input-field text-lg font-mono"
                  />
                  <p className="text-sm text-gray-400 mt-2">
                    Example: <code className="text-primary-300">0 9 * * 1-5</code> (Weekdays at 9 AM)
                  </p>
                </div>
                
                {!isValid && error && (
                  <div className="p-3 bg-red-600/20 border border-red-500/50 rounded-lg">
                    <p className="text-red-300 text-sm">{error}</p>
                  </div>
                )}
              </div>
            </div>
            
            {/* Enhanced Description Display */}
            {cronExpression && isValid && (
              <div className="card p-6">
                <h3 className="text-lg font-semibold text-white mb-3">What This Expression Means</h3>
                <div className="bg-white/10 rounded-lg p-4 border border-white/20">
                  <div className="flex items-center mb-2">
                    <div className="status-indicator status-valid mr-3"></div>
                    <span className="text-green-400 font-medium">Valid Schedule</span>
                  </div>
                  <p className="text-white text-lg font-medium">
                    {getCronDescription(cronExpression)}
                  </p>
                </div>
              </div>
            )}
            
            <div className="flex justify-center gap-4">
              <button
                onClick={handleClear}
                className="btn-secondary"
              >
                <span className="btn-icon">🗑️</span>
                Clear
              </button>
              <button
                onClick={() => navigator.clipboard.writeText(cronExpression)}
                className="btn-primary"
                disabled={!cronExpression}
              >
                <span className="btn-icon">📋</span>
                Copy Expression
              </button>
            </div>
          </div>

          <div className="space-y-6">
            <SchedulePreview
              expression={cronExpression}
              isValid={isValid}
            />
          </div>
        </div>

        <div className="mb-8">
          <CronExamples onExampleSelect={handleExampleSelect} />
        </div>

        <div className="card p-6">
          <h3 className="text-xl font-semibold text-white mb-4">Cron Expression Help</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            <div>
              <h4 className="text-white font-medium mb-2">Field Format</h4>
              <div className="text-sm text-gray-300 space-y-1">
                <div><code className="text-primary-300">*</code> - Any value</div>
                <div><code className="text-primary-300">,</code> - List of values</div>
                <div><code className="text-primary-300">-</code> - Range of values</div>
                <div><code className="text-primary-300">/</code> - Step values</div>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-2">Time Fields</h4>
              <div className="text-sm text-gray-300 space-y-1">
                <div><strong>Minute:</strong> 0-59</div>
                <div><strong>Hour:</strong> 0-23</div>
                <div><strong>Day:</strong> 1-31</div>
                <div><strong>Month:</strong> 1-12</div>
                <div><strong>Weekday:</strong> 0-7 (0=Sunday)</div>
              </div>
            </div>
            
            <div>
              <h4 className="text-white font-medium mb-2">Common Examples</h4>
              <div className="text-sm text-gray-300 space-y-1">
                <div><code className="text-primary-300">*/5 * * * *</code> - Every 5 minutes</div>
                <div><code className="text-primary-300">0 9 * * 1-5</code> - Weekdays at 9 AM</div>
                <div><code className="text-primary-300">0 0 1 * *</code> - First day of month</div>
                <div><code className="text-primary-300">0 2 * * 0</code> - Every Sunday at 2 AM</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <footer className="footer">
        <div className="container mx-auto px-4">
          <p className="text-center text-gray-400">
            &copy; 2025 Lekshmi Kolappan | 
            <a href="https://github.com/Lforlinux/cronctl" target="_blank" rel="noopener noreferrer" className="text-primary-400 hover:text-primary-300 ml-1">
              View this project on GitHub
            </a>
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
