import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import { useTasks } from '../context/TasksContext';
import { TaskFormValues } from '../types/forms';

const EditTaskPage: React.FC = () => {
  const navigate = useNavigate();
  const { id } = useParams<{ id: string }>();
  const { getTaskById, updateTask, isLoading } = useTasks();
  const [submitError, setSubmitError] = useState<string | null>(null);

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

  const handleSubmit = (values: TaskFormValues) => {
    try {
      updateTask(id, values);
      setSubmitError(null);
      navigate(`/task/${id}`);
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Failed to update task');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div style={{ maxWidth: '448px', margin: '0 auto' }} className="card">
        <h1>Edit Task</h1>
        <p className="mb-6">Update your task details</p>

        {submitError && (
          <div className="error-box">
            <p>{submitError}</p>
          </div>
        )}

        <TaskForm
          initialValues={{
            title: task.title,
            description: task.description,
            priority: task.priority,
            dueDate: task.dueDate,
          }}
          onSubmit={handleSubmit}
          isLoading={isLoading}
          submitLabel="Update Task"
        />

        <button
          onClick={() => navigate(`/task/${id}`)}
          className="btn-link"
          style={{ marginTop: '16px', display: 'block', width: '100%', textAlign: 'center' }}
        >
          Cancel
        </button>
      </div>
    </div>
  );
};

export default EditTaskPage;
