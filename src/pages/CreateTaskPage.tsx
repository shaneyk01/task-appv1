import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import TaskForm from '../components/TaskForm';
import { useTasks } from '../context/TasksContext';
import { TaskFormValues } from '../types/forms';

const CreateTaskPage: React.FC = () => {
  const navigate = useNavigate();
  const { addTask, isLoading } = useTasks();
  const [submitError, setSubmitError] = useState<string | null>(null);

  const handleSubmit = (values: TaskFormValues) => {
    try {
      addTask(values);
      setSubmitError(null);
      navigate('/dashboard');
    } catch (error) {
      setSubmitError(error instanceof Error ? error.message : 'Failed to create task');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12 px-4">
      <div style={{ maxWidth: '448px', margin: '0 auto' }} className="card">
        <h1>Create New Task</h1>
        <p className="mb-6">Create a new task to organize your work</p>

        {submitError && (
          <div className="error-box">
            <p>{submitError}</p>
          </div>
        )}

        <TaskForm
          onSubmit={handleSubmit}
          isLoading={isLoading}
          submitLabel="Create Task"
        />

        <button
          onClick={() => navigate('/dashboard')}
          className="btn-link"
          style={{ marginTop: '16px', display: 'block', width: '100%', textAlign: 'center' }}
        >
          Back to Dashboard
        </button>
      </div>
    </div>
  );
};

export default CreateTaskPage;
