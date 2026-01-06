export interface Task {
  id: string;
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  priority: 'low' | 'medium' | 'high';
  dueDate: string | null;
  createdAt: string;
  updatedAt: string;
  userId: string;
}

export interface TaskCreateInput {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  dueDate: string | null;
}

export interface TaskUpdateInput extends Partial<TaskCreateInput> {
  status?: 'pending' | 'in-progress' | 'completed';
}
