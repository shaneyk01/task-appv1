import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth0 } from '@auth0/auth0-react';
import { useTasks } from '../context/TasksContext';

const TaskDashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth0();
  const { tasks, deleteTask } = useTasks();

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed':
        return 'status-completed';
      case 'in-progress':
        return 'status-in-progress';
      case 'pending':
        return 'status-pending';
      default:
        return 'status-pending';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'high':
        return 'priority-high';
      case 'medium':
        return 'priority-medium';
      case 'low':
        return 'priority-low';
      default:
        return '';
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <nav className="navbar">
        <div className="navbar-content">
          <h1>Task Dashboard</h1>
          <div className="navbar-actions">
            <div className="navbar-user">
              Welcome, <span>{user?.name || 'User'}</span>
            </div>
            <button
              onClick={() => logout({ returnTo: window.location.origin })}
              className="btn btn-danger"
            >
              Logout
            </button>
          </div>
        </div>
      </nav>

      <main className="container py-8">
        <div className="flex-between mb-8">
          <h2 style={{ fontSize: '28px', fontWeight: '700' }}>Your Tasks</h2>
          <button
            onClick={() => navigate('/create-task')}
            className="btn btn-primary"
            style={{ width: 'auto' }}
          >
            Create New Task
          </button>
        </div>

        {tasks.length === 0 ? (
          <div className="empty-state">
            <p>No tasks yet</p>
            <button
              onClick={() => navigate('/create-task')}
              className="btn btn-primary"
              style={{ width: 'auto', display: 'inline-block', padding: '8px 24px' }}
            >
              Create Your First Task
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-3">
            {tasks.map((task) => (
              <div
                key={task.id}
                className="task-card"
                onClick={() => navigate(`/task/${task.id}`)}
              >
                <div className="flex-between mb-2">
                  <h3 className="task-card-title">{task.title}</h3>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      if (window.confirm('Are you sure you want to delete this task?')) {
                        deleteTask(task.id);
                      }
                    }}
                    className="btn-link"
                    style={{ color: '#dc2626', fontSize: '14px' }}
                  >
                    Delete
                  </button>
                </div>

                <p className="task-card-description">{task.description}</p>

                <div className="task-card-meta">
                  <span className={getStatusColor(task.status)}>
                    {task.status}
                  </span>
                  <span className={`priority-${task.priority}`}>
                    {task.priority.toUpperCase()}
                  </span>
                </div>

                {task.dueDate && (
                  <p style={{ fontSize: '12px', color: '#6b7280', marginTop: '8px' }}>
                    Due: {new Date(task.dueDate).toLocaleDateString()}
                  </p>
                )}
              </div>
            ))}
          </div>
        )}
      </main>
    </div>
  );
};

export default TaskDashboardPage;
