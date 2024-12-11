import { Task } from "../types";
import { httpClient } from "../../../utils/httpClient";

const BASE_URL = 'http://localhost:3001';
const { request } = httpClient();

export async function removeTaskApi(taskId: number): Promise<number> {
    await deleteTaskApi(taskId);
    return taskId;
}

export async function fetchTasksFromApi(): Promise<Task[]> {
    return await request(`${BASE_URL}/tasks`);
}

export async function createTaskApi(newTask: Task): Promise<Task> {
    return await request(`${BASE_URL}/tasks`, 'POST', JSON.stringify(newTask));
}

export async function updateTaskApi(updateTask: Task): Promise<Task> {
    return  await request(`${BASE_URL}/tasks`, 'PUT', JSON.stringify(updateTask));
}

export async function deleteTaskApi(taskId: number): Promise<{}> {
    return  await request(`${BASE_URL}/tasks/${taskId}`, 'DELETE' );
}

