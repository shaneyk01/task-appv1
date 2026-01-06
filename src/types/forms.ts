export interface TaskFormValues {
  title: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  dueDate: string | null;
}

export interface FormErrors {
  title?: string;
  description?: string;
  priority?: string;
  dueDate?: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: FormErrors;
}
