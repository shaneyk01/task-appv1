# Task Manager App

A modern, full-featured task management application built with React, TypeScript, and Vite. Features secure authentication with Auth0, responsive design with Tailwind CSS, and comprehensive task management functionality.

## Features

- **User Authentication**: Secure login/signup with Auth0
- **Task Management**: Create, read, update, and delete tasks
- **Task Details**: View comprehensive task information
- **Responsive Design**: Mobile-friendly interface with Tailwind CSS
- **Protected Routes**: Secure pages that require authentication
- **State Management**: Context API for centralized task state

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS, PostCSS
- **Routing**: React Router v6
- **Authentication**: Auth0
- **State Management**: React Context API

## Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Auth0 account

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd taskappv2
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```
   VITE_AUTH0_DOMAIN=your-auth0-domain
   VITE_AUTH0_CLIENT_ID=your-auth0-client-id
   VITE_AUTH0_AUDIENCE=https://your-auth0-domain/api/v2/
   VITE_APP_NAME=Task Manager
   ```

4. **Configure Auth0**
   - Go to [Auth0 Dashboard](https://manage.auth0.com)
   - Create a new Single Page Application
   - Set Allowed Callback URLs to: `http://localhost:3007/dashboard`
   - Copy your Domain and Client ID to the `.env` file

## Running the App

**Development Server**
```bash
npm run dev
```
The app will run on `http://localhost:3007`

**Build for Production**
```bash
npm run build
```

**Preview Production Build**
```bash
npm run preview
```

## Project Structure

```
src/
├── App.tsx                 # Main app component with routing
├── main.tsx               # Entry point with Auth0 provider
├── index.css              # Global styles
├── components/
│   ├── ProtectedRoute.tsx # Route guard component
│   └── TaskForm.tsx       # Reusable task form
├── context/
│   └── TasksContext.tsx   # Task state management
├── pages/
│   ├── AuthPage.tsx       # Login page
│   ├── TaskDashboardPage.tsx # Task list
│   ├── TaskDetailsPage.tsx # Task details view
│   ├── CreateTaskPage.tsx # Create task form
│   └── EditTaskPage.tsx   # Edit task form
└── types/
    ├── auth.ts           # Auth type definitions
    ├── forms.ts          # Form type definitions
    └── task.ts           # Task type definitions
```

## Key Pages

- **`/auth`** - Login page (public)
- **`/dashboard`** - Task list (protected)
- **`/create-task`** - Create new task (protected)
- **`/task/:id`** - View task details (protected)
- **`/edit-task/:id`** - Edit task (protected)

## Development Notes

- The app uses Vite's HMR for fast development experience
- Auth0 redirect is configured to `/dashboard` to prevent redirect loops
- Tasks are managed through Context API and stored in component state
- All routes except `/auth` require authentication via ProtectedRoute component

## Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint (if configured)

## License

This project is private.
