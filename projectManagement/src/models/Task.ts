export interface Task {
  id: string;
  name: string;
  description: string;
  priority: 'low' | 'medium' | 'high';
  storyId: string;
  estimatedTime: number;
  status: 'todo' | 'doing' | 'done';
  createdAt: Date;
  startTime?: Date;
  endTime?: Date;
  responsibleUserId?: string;
}