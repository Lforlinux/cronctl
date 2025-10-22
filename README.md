# cronctl

A powerful, user-friendly cron expression editor and scheduler tool built with React and Vite. Create, validate, and preview cron expressions with an intuitive interface.

## Features

- 🎯 **Interactive Cron Editor** - Visual field-by-field editing with real-time validation
- 📅 **Schedule Preview** - See next 5 execution times with relative timestamps
- 📚 **Example Library** - Common cron patterns organized by category
- 🎨 **Modern UI** - Beautiful dark/light theme with responsive design
- ✅ **Real-time Validation** - Instant feedback on expression validity
- 📋 **One-click Copy** - Copy expressions to clipboard
- 🔍 **Smart Descriptions** - Human-readable schedule descriptions

## Getting Started

### Prerequisites

- Node.js 16+ 
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone https://github.com/Lforlinux/cronctl.git
cd cronctl
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to `http://localhost:5173`

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## Usage

### Creating Cron Expressions

1. **Manual Entry**: Type directly into the cron expression field
2. **Field Editor**: Use the visual editor to set individual fields
3. **Examples**: Click on example expressions to use them as templates

### Understanding Cron Fields

| Field | Range | Description |
|-------|-------|-------------|
| Minute | 0-59 | Minutes of the hour |
| Hour | 0-23 | Hours of the day |
| Day of Month | 1-31 | Day of the month |
| Month | 1-12 | Month of the year |
| Day of Week | 0-7 | Day of the week (0=Sunday) |

### Common Patterns

- `* * * * *` - Every minute
- `*/5 * * * *` - Every 5 minutes
- `0 9 * * 1-5` - Weekdays at 9 AM
- `0 0 1 * *` - First day of every month
- `0 2 * * 0` - Every Sunday at 2 AM

## Project Structure

```
cronctl/
├── src/
│   ├── components/
│   │   ├── CronEditor.jsx      # Main cron expression editor
│   │   ├── SchedulePreview.jsx # Next run times display
│   │   ├── CronExamples.jsx    # Example expressions
│   │   └── ThemeToggle.jsx     # Dark/light theme toggle
│   ├── utils/
│   │   ├── cronParser.js       # Cron parsing and validation
│   │   └── cronExamples.js     # Example expressions data
│   ├── App.jsx                 # Main application component
│   ├── main.jsx               # Application entry point
│   └── index.css              # Global styles
├── package.json
├── vite.config.js
├── tailwind.config.js
└── README.md
```

## Technologies Used

- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **cron-parser** - Cron expression parsing library
- **JavaScript ES6+** - Modern JavaScript features

## Features in Detail

### Interactive Editor
- Real-time validation with error messages
- Field-by-field editing with helpful descriptions
- Visual feedback for valid/invalid expressions

### Schedule Preview
- Shows next 5 execution times
- Relative timestamps (e.g., "in 2 hours")
- Human-readable schedule descriptions

### Example Library
- Categorized examples (Common, Daily, Workdays, etc.)
- One-click example selection
- Popular patterns highlighted

### Theme Support
- Dark and light themes
- System preference detection
- Persistent theme selection

## Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- Inspired by [crontab.guru](https://crontab.guru/)
- Built with modern web technologies
- Designed for developers and system administrators

## Support

If you find this project helpful, please consider:
- ⭐ Starring the repository
- 🐛 Reporting bugs
- 💡 Suggesting new features
- 🤝 Contributing to the codebase

---

**Made with ❤️ by Lekshmi Kolappan**
