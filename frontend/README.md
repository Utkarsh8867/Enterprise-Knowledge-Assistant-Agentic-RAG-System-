# Enterprise Knowledge Assistant - Frontend

Modern React frontend for the Enterprise Knowledge Assistant Agentic RAG System.

## Features

- 🎨 Clean, modern UI with gradient design
- 💬 Real-time chat interface
- 📄 Drag-and-drop document upload
- 📊 Live system statistics
- 🎯 Confidence scoring visualization
- 📚 Source citations display
- 📱 Responsive design

## Prerequisites

- Node.js 16+ and npm
- Backend API running on http://localhost:8000

## Installation

```bash
# Install dependencies
npm install
```

## Running the Application

```bash
# Start development server
npm start
```

The application will open at http://localhost:3000

## Building for Production

```bash
# Create production build
npm run build
```

## Project Structure

```
frontend/
├── public/
│   └── index.html
├── src/
│   ├── components/
│   │   ├── ChatInterface.js      # Main chat component
│   │   ├── DocumentUpload.js     # File upload component
│   │   └── SystemStats.js        # System metrics display
│   ├── services/
│   │   └── api.js                # API service layer
│   ├── App.js                    # Main app component
│   ├── App.css                   # App styles
│   ├── index.js                  # Entry point
│   └── index.css                 # Global styles
├── package.json
└── README.md
```

## Configuration

Edit `.env` to change the API URL:

```
REACT_APP_API_URL=http://localhost:8000
```

## Technologies Used

- React 18
- Axios for API calls
- Lucide React for icons
- CSS3 with animations
