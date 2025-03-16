
# Kickflip Funnels

A modern marketing funnel builder with AI-powered optimization and drag-and-drop functionality.

![Kickflip Funnels Screenshot](https://api.placeholder.com/150x150)

## Features

- **Visual Funnel Builder**: Create marketing funnels with intuitive drag-and-drop functionality
- **AI-Powered Assistant**: Get real-time suggestions to optimize your funnels
- **Industry Analysis**: Generate high-converting funnel templates based on industry data
- **Admin Dashboard**: Manage and analyze your marketing funnels in one place

## Technology Stack

- React.js
- Tailwind CSS
- React Beautiful DND (for drag-and-drop)
- React Router (for navigation)
- OpenAI API (for AI assistant)

## Getting Started

### Prerequisites

- Node.js (v14.0.0 or later)
- npm or yarn

### Installation

1. Clone the repository:
   ```
   git clone https://github.com/yourusername/kickflip-funnels.git
   cd kickflip-funnels
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the root directory with your OpenAI API key:
   ```
   REACT_APP_OPENAI_API_KEY=your_api_key_here
   ```

4. Start the development server:
   ```
   npm start
   ```

5. Open [http://0.0.0.0:3000](http://0.0.0.0:3000) to view it in your browser.

## Development with Replit

1. Fork this Repl to your account
2. Add your environment variables in the Secrets tab
3. Click the Run button to start the development server

## Deployment

1. Go to the Deployment tab in your Repl
2. Configure your deployment settings
3. Click Deploy to publish your changes

## Project Structure

```
kickflip-funnels/
├── public/               # Static files
├── src/
│   ├── components/       # React components
│   │   ├── chat/         # AI assistant components
│   │   ├── dashboard/    # Admin dashboard components
│   │   └── funnel-builder/ # Funnel builder components
│   ├── services/         # API and service functions
│   ├── pages/            # Page components
│   ├── App.jsx           # Main application component
│   └── index.js          # Application entry point
├── .env.example          # Example environment variables
├── package.json          # Dependencies and scripts
├── tailwind.config.js    # Tailwind CSS configuration
└── README.md            # Project documentation
```

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.

## Acknowledgements

- [React Beautiful DND](https://github.com/atlassian/react-beautiful-dnd)
- [Tailwind CSS](https://tailwindcss.com/)
- [OpenAI](https://openai.com/)
