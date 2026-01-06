import React from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useTasks } from '../context/TasksContext';

const TaskDetailsPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { getTaskById, updateTask, deleteTask } = useTasks();

  const task = id ? getTaskById(id) : null;

  if (!task) {
    return (
      <div className="flex-center min-h-screen">
        <div className="text-center">
          <h2 style={{ fontSize: '24px', fontWeight: '700', marginBottom: '8px' }}>Task Not Found</h2>
          <button
            onClick={() => navigate('/dashboard')}
            className="btn-link"
          >
            Back to Dashboard
          </button>
        </div>
      </div>
    );
  }

  const handleStatusChange = (newStatus: 'pending' | 'in-progress' | 'completed') => {
    updateTask(id!, { status: newStatus });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div style={{ maxWidth: '48rem', margin: '0 auto', padding: '0 16px' }} className="py-8">
        <button
          onClick={() => navigate('/dashboard')}
          className="btn-link mb-6"
        >
          ← Back to Dashboard
        </button>

        <div className="card">
          <div className="card-header">
            <div>
              <h1 style={{ fontSize: '36px' }}>{task.title}</h1>
              <p>
                Created on {new Date(task.createdAt).toLocaleDateString()}
              </p>
            </div>
            <div className="card-actions">
              <button
                onClick={() => navigate(`/edit-task/${id}`)}
                className="btn btn-primary"
                style={{ width: 'auto', padding: '8px 16px' }}
              >
                Edit
              </button>
              <button
                onClick={() => {
                  if (window.confirm('Are you sure you want to delete this task?')) {
                    deleteTask(id!);
                    navigate('/dashboard');
                  }
                }}
                className="btn btn-danger"
                style={{ width: 'auto', padding: '8px 16px' }}
              >
                Delete
              </button>
            </div>
          </div>

          <div className="mb-6">
            <p style={{ fontSize: '18px', lineHeight: '1.6' }}>{task.description}</p>
          </div>

          <div className="grid grid-cols-2 mb-6">
            <div>
              <label className="block text-sm font-medium mb-2">Status</label>
              <select
                value={task.status}
                onChange={(e) =>
                  handleStatusChange(e.target.value as 'pending' | 'in-progress' | 'completed')
                }
                className="block w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="pending">Pending</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Priority</label>
              <div style={{ fontSize: '18px', fontWeight: '600', textTransform: 'capitalize' }}>
                {task.priority}
              </div>
            </div>
          </div>

          {task.dueDate && (
            <div className="mb-6">
              <label className="block text-sm font-medium mb-2">Due Date</label>
              <p style={{ fontSize: '18px' }}>
                {new Date(task.dueDate).toLocaleDateString('en-US', {
                  weekday: 'long',
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric',
                })}
              </p>
            </div>
          )}

          <div className="pt-6 border-t">
            <p style={{ fontSize: '12px', color: '#6b7280' }}>
              Last updated on {new Date(task.updatedAt).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetailsPage;
