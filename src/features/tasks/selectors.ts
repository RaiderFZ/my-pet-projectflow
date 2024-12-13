import { createSelector } from "@reduxjs/toolkit";
import { RootState } from '../../app/store';
import { Task } from "./types";

const selectTasksState = (state: RootState) => state.tasks.tasks;

export const selectAllTasks = (state: RootState) => state.tasks.tasks;

export const selectTaskByStatus = createSelector(
    [selectTasksState, (_: RootState, status: Task['status']) => status],
    (tasks, status) => tasks.filter((task) => task.status === status)
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

export const selectTaskByDateRange = createSelector(
    [
        selectTasksState,
        (_: RootState, startDate: string) => startDate,
        (_: RootState, __: string, endDate: string) => endDate
    ],
    (tasks, startDate, endDate) =>
        tasks.filter(
            (task) =>
                new Date(task.dueData) >= new Date(startDate) &&
                new Date(task.dueData) <= new Date(endDate)
        )
);