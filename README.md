# BDS Accounting Frontend

A modern React application built with Vite for BDS Accounting services.

## Features

- Modern React 18 with hooks
- Vite for fast development and building
- Responsive design with CSS Grid and Flexbox
- Professional accounting website layout
- Environment variable support

## Getting Started

### Prerequisites

- Node.js (version 16 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install dependencies:
   ```bash
   npm install
   ```

### Development

To start the development server:

```bash
npm run dev
```

The app will open at `http://localhost:3000`

### Building for Production

To create a production build:

```bash
npm run build
```

To preview the production build:

```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Home.jsx          # Home page component
│   └── Home.css          # Home page styles
├── App.jsx               # Main app component
├── App.css               # App-level styles
├── main.jsx              # App entry point
└── index.css             # Global styles
```

## Environment Variables

Create a `.env` file in the root directory with:

```
VITE_APP_TITLE=BDS Accounting
VITE_APP_VERSION=1.0.0
VITE_API_URL=http://localhost:8000
```

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
