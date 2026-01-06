import React, { useState } from 'react';
import { TaskFormValues, ValidationResult } from '../types/forms';

interface TaskFormProps {
  initialValues?: Partial<TaskFormValues>;
  onSubmit: (values: TaskFormValues) => void;
  isLoading?: boolean;
  submitLabel?: string;
}

const TaskForm: React.FC<TaskFormProps> = ({
  initialValues = {} as Partial<TaskFormValues>,
  onSubmit,
  isLoading = false,
  submitLabel = 'Submit',
}) => {
  const [values, setValues] = useState<TaskFormValues>({
    title: initialValues.title || '',
    description: initialValues.description || '',
    priority: initialValues.priority || 'medium',
    dueDate: initialValues.dueDate || null,
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const validate = (): ValidationResult => {
    const newErrors: Record<string, string> = {};

    if (!values.title.trim()) {
      newErrors.title = 'Title is required';
    } else if (values.title.length < 3) {
      newErrors.title = 'Title must be at least 3 characters';
    }

    if (!values.description.trim()) {
      newErrors.description = 'Description is required';
    } else if (values.description.length < 10) {
      newErrors.description = 'Description must be at least 10 characters';
    }

    if (values.dueDate) {
      const dueDate = new Date(values.dueDate);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      if (dueDate < today) {
        newErrors.dueDate = 'Due date cannot be in the past';
      }
    }

    setErrors(newErrors);
    return { isValid: Object.keys(newErrors).length === 0, errors: newErrors };
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setValues((prev: TaskFormValues) => ({
      ...prev,
      [name]: name === 'dueDate' && !value ? null : value,
    }));
    if (errors[name]) {
      setErrors((prev: Record<string, string>) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const validation = validate();
    if (validation.isValid) {
      onSubmit(values);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="form-group">
        <label htmlFor="title">Title</label>
        <input
          type="text"
          id="title"
          name="title"
          value={values.title}
          onChange={handleChange}
          style={{ borderColor: errors.title ? '#dc2626' : undefined }}
          placeholder="Enter task title"
          disabled={isLoading}
        />
        {errors.title && <p className="form-error">{errors.title}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          value={values.description}
          onChange={handleChange}
          style={{ borderColor: errors.description ? '#dc2626' : undefined }}
          placeholder="Enter task description"
          disabled={isLoading}
        />
        {errors.description && (
          <p className="form-error">{errors.description}</p>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="priority">Priority</label>
        <select
          id="priority"
          name="priority"
          value={values.priority}
          onChange={handleChange}
          disabled={isLoading}
        >
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="dueDate">Due Date (Optional)</label>
        <input
          type="date"
          id="dueDate"
          name="dueDate"
          value={values.dueDate || ''}
          onChange={handleChange}
          style={{ borderColor: errors.dueDate ? '#dc2626' : undefined }}
          disabled={isLoading}
        />
        {errors.dueDate && <p className="form-error">{errors.dueDate}</p>}
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="btn btn-primary"
      >
        {isLoading ? 'Loading...' : submitLabel}
      </button>
    </form>
  );
};

export default TaskForm;
