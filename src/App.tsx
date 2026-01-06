import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { TasksProvider } from './context/TasksContext';
import ProtectedRoute from './components/ProtectedRoute';
import AuthPage from './pages/AuthPage';
import TaskDashboardPage from './pages/TaskDashboardPage';
import TaskDetailsPage from './pages/TaskDetailsPage';
import CreateTaskPage from './pages/CreateTaskPage';
import EditTaskPage from './pages/EditTaskPage';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <TasksProvider>
        <Routes>
          {/* Public Routes */}
          <Route path="/auth" element={<AuthPage />} />

          {/* Protected Routes */}
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <TaskDashboardPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/create-task"
            element={
              <ProtectedRoute>
                <CreateTaskPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/task/:id"
            element={
              <ProtectedRoute>
                <TaskDetailsPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/edit-task/:id"
            element={
              <ProtectedRoute>
                <EditTaskPage />
              </ProtectedRoute>
            }
          />

          {/* Default redirect */}
          <Route path="/" element={<Navigate to="/auth" replace />} />
          <Route path="*" element={<Navigate to="/auth" replace />} />
        </Routes>
      </TasksProvider>
    </BrowserRouter>
  );
};

export default App;
