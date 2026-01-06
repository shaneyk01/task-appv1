import React, { createContext, useContext, useState, useCallback } from 'react';
import { Task, TaskCreateInput, TaskUpdateInput } from '../types/task';

interface TasksContextType {
  tasks: Task[];
  isLoading: boolean;
  error: string | null;
  addTask: (task: TaskCreateInput) => void;
  updateTask: (id: string, updates: TaskUpdateInput) => void;
  deleteTask: (id: string) => void;
  getTaskById: (id: string) => Task | undefined;
  getTasks: () => Task[];
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

interface TasksProviderProps {
  children: React.ReactNode;
}

export const TasksProvider: React.FC<TasksProviderProps> = ({ children }: TasksProviderProps) => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const addTask = useCallback((taskInput: TaskCreateInput) => {
    try {
      setIsLoading(true);
      const newTask: Task = {
        id: `task-${Date.now()}`,
        ...taskInput,
        status: 'pending',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
        userId: 'current-user-id',
      };
      setTasks((prevTasks: Task[]) => [newTask, ...prevTasks]);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to add task');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const updateTask = useCallback((id: string, updates: TaskUpdateInput) => {
    try {
      setIsLoading(true);
      setTasks((prevTasks: Task[]) =>
        prevTasks.map((task: Task) =>
          task.id === id
            ? {
                ...task,
                ...updates,
                updatedAt: new Date().toISOString(),
              }
            : task
        )
      );
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update task');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const deleteTask = useCallback((id: string) => {
    try {
      setIsLoading(true);
      setTasks((prevTasks: Task[]) => prevTasks.filter((task: Task) => task.id !== id));
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete task');
    } finally {
      setIsLoading(false);
    }
  }, []);

  const getTaskById = useCallback((id: string) => {
    return tasks.find((task: Task) => task.id === id);
  }, [tasks]);

  const getTasks = useCallback(() => {
    return tasks;
  }, [tasks]);

  return (
    <TasksContext.Provider
      value={{
        tasks,
        isLoading,
        error,
        addTask,
        updateTask,
        deleteTask,
        getTaskById,
        getTasks,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};

export const useTasks = () => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error('useTasks must be used within TasksProvider');
  }
  return context;
};
