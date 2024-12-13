export interface Task {
    id: number;
    title: string;
    description: string;
    priority: 'low' | 'medium' | 'high';
    status: 'todo' | 'in-progress' | 'done';
    dueData: string;
    create: string;
    createdAt: string;
    updateAt: string;
}
