import { Task } from "../types";
import { httpClient } from "../../../utils/httpClient";

const BASE_URL = 'http://localhost:3001';
const { request } = httpClient();

async function makeRequest<T>(endpoint: string, method: string = "GET", body?: object): Promise<T> {
    try {
        const options = body ? JSON.stringify(body) : null;
        return await request(`${BASE_URL}/${endpoint}`, method, options);
    } catch (error) {
        console.error(`Error in ${method} ${endpoint}:`, error);
        throw error;
    }
}

export async function fetchTasksFromApi(): Promise<Task[]> {
    return await makeRequest<Task[]>(`tasks`);
}

export async function createTaskApi(newTask: Task): Promise<Task> {
    return await makeRequest<Task>('tasks', 'POST', newTask);
}

export async function updateTaskApi(updateTask: Partial<Task> & { id: number }): Promise<Task> {
    return  await makeRequest<Task>(`tasks/${updateTask.id}`, "PATCH", updateTask);
}

export async function deleteTaskApi(taskId: number): Promise<{}> {
    return  await makeRequest<Task>(`tasks/${taskId}`, 'DELETE' );
}

export async function removeTaskApi(taskId: number): Promise<number> {
    await deleteTaskApi(taskId);
    return taskId;
}
