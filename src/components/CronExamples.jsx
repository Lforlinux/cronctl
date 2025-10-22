import React, { useState } from 'react'
import { cronExamples, getExamplesByCategory } from '../utils/cronExamples'

const CronExamples = ({ onExampleSelect }) => {
  const [selectedCategory, setSelectedCategory] = useState('All')
  const categories = getExamplesByCategory()
  const allCategories = ['All', ...Object.keys(categories)]

  const getFilteredExamples = () => {
    if (selectedCategory === 'All') {
      return cronExamples
    }
    return categories[selectedCategory] || []
  }

  return (
    <div className="card p-6">
      <h3 className="text-xl font-semibold text-white mb-4">Cron Examples</h3>
      
      <div className="mb-4">
        <div className="flex flex-wrap gap-2">
          {allCategories.map(category => (
            <button
              key={category}
              onClick={() => setSelectedCategory(category)}
              className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-200 ${
                selectedCategory === category
                  ? 'bg-primary-600 text-white'
                  : 'bg-white/10 text-gray-300 hover:bg-white/20'
              }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <div className="examples-grid">
        {getFilteredExamples().map((example, index) => (
          <div
            key={index}
            className="example-card"
            onClick={() => onExampleSelect(example.expression)}
          >
            <div className="example-title">{example.title}</div>
            <div className="example-expression">{example.expression}</div>
            <div className="example-description">{example.description}</div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default CronExamples
