import { createSelector } from "@reduxjs/toolkit";
import { RootState } from '../../app/store';
import { Task } from "./types";

const selectTasksState = (state: RootState) => state.tasks.tasks;

export const selectAllTasks = createSelector(
    [selectTasksState],
    (tasks) => tasks
);

export const selectTaskByStatus = (status: Task['status']) => 
    createSelector(
        [selectTasksState],
        (tasks) => tasks.filter((task) => task.status === status)
    );

export const selectByPriority = (priority: Task['priority']) => 
    createSelector(
        [selectTasksState],
        (tasks) => tasks.filter((task) => task.priority === priority)
    );

export const selectOverdueTasks = createSelector(
    [selectTasksState],
    (tasks) => {
        const now = new Date().toISOString();
        return tasks.filter((task) => task.dueData < now && task.status !== 'done');
    }
);

export const selectTaskByDateRange = (startDate: string, endDate: string) => {
    createSelector(
        [selectTasksState],
        (tasks) => 
            tasks.filter((task) => task.dueData >= startDate && task.dueData <= endDate)
    );
}