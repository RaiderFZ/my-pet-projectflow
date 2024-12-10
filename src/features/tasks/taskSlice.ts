import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from './types';
import { fetchTasksFromApi, createTaskApi, updateTaskApi, deleteTaskApi } from "./api/tasksApi";

interface TasksState {
    tasks: Task[];
    loading: boolean;
    error: string | null;
};

const initialState: TasksState = {
    tasks: [],
    loading: false,
    error: null
};

export const fetchTasks = createAsyncThunk('tasks/fetchTasks', async () => {
    const tasks = await fetchTasksFromApi();
    return tasks;
});

export const addNewTask = createAsyncThunk('tasks/addNewTask', async (task: Task) => {
    const createdTask = await createTaskApi(task);
    return createdTask;
});

export const updateExistingTask = createAsyncThunk('tasks/updateTask', async (task: Task) => {
    const updatedTask = await updateTaskApi(task);
    return updatedTask;
});

export const removeExistingTask = createAsyncThunk('tasks/removeTask', async (taskId: number) => {
    await deleteTaskApi(taskId);
    return taskId;
});

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<Task>) => {
            state.tasks.push(action.payload);
        },
        updateTask: (state, action: PayloadAction<Task>) => {
            const index = state.tasks.findIndex(task => task.id === action.payload.id);
            if(index !== -1) {
                state.tasks[index] = action.payload;
            }
        },
        removeTask: (state, action: PayloadAction<number>) => {
            state.tasks = state.tasks.filter(task => task.id !== action.payload);
        },
        setTasks: (state, action: PayloadAction<Task[]>) => {
            state.tasks = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
                state.loading = false;
                state.tasks = action.payload; 
            })
            .addCase(fetchTasks.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Failed to load tasks';
            })
        builder
        .addCase(addNewTask.pending, (state) => {
            state.loading = true;
        })
        .addCase(addNewTask.fulfilled, (state, action: PayloadAction<Task>) => {
            state.loading = false;
            state.tasks.push(action.payload);
        })
        .addCase(addNewTask.rejected, (state, action) => {
            state.loading = false;
            state.error = action.error.message ?? 'Failed to add task'
        })

        builder
            .addCase(updateExistingTask.pending, (state) => {
                state.loading = true;
            })
            .addCase(updateExistingTask.fulfilled, (state, action: PayloadAction<Task> ) => {
                state.loading = false;
                const index = state.tasks.findIndex(t => t.id === action.payload.id);
                if(index !== -1) {
                    state.tasks[index] = action.payload;
                }
            })
            .addCase(updateExistingTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Failed to update task';
              });

        builder
            .addCase(removeExistingTask.pending, (state) => {
                state.loading = true;
            })
            .addCase(removeExistingTask.fulfilled, (state, action:PayloadAction<number> ) => {
                state.loading = false;
                state.tasks = state.tasks.filter(task => task.id !== action.payload);
            })
            .addCase(removeExistingTask.rejected, (state, action) => {
                state.loading = false;
                state.error = action.error.message ?? 'Failed to remove task';
              });
    }
});

export const { setTasks } = taskSlice.actions;
export default taskSlice.reducer;