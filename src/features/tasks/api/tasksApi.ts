import { Task } from "../types";
import { useHttp } from "../../../utils/useHttp";

const BASE_URL = 'http://localhost:3001';

export async function fetchTasksFromApi(): Promise<Task[]> {
    const { request } = useHttp();
    return await request(`${BASE_URL}/tasks`);
}

export async function createTaskApi(newTask: Task): Promise<Task> {
    const { request } = useHttp();
    return await request(`${BASE_URL}/tasks`, 'POST', JSON.stringify(newTask));
}

export async function updateTaskApi(updateTask: Task): Promise<Task> {
    const { request } = useHttp(); 
    return  await request(`${BASE_URL}/tasks`, 'PUT', JSON.stringify(updateTask));
}

export async function deleteTaskApi(taskId: number): Promise<{}> {
    const { request } = useHttp(); 
    return  await request(`${BASE_URL}/tasks/${taskId}`, 'DELETE' );
}