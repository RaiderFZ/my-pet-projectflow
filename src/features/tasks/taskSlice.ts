import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Task } from './types';
import { fetchTasksFromApi, createTaskApi, updateTaskApi, removeTaskApi } from "./api/tasksApi";
import { createAsyncThunkForApi } from "./createAsyncThunkForApi";

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

export const fetchTasks = createAsyncThunkForApi<Task[], void>('tasks/fetchTasks', fetchTasksFromApi);
export const addNewTask = createAsyncThunkForApi<Task, Task>('tasks/addNewTask', createTaskApi);
export const updateExistingTask = createAsyncThunkForApi<
    Task,
    Task
>('tasks/updateTask', updateTaskApi);

export const removeExistingTask = createAsyncThunkForApi<number, number>('tasks/removeTask', removeTaskApi);

const setLoading = (state: TasksState) => {
    state.loading = true;
    state.error = null;
};

const setError = (state: TasksState, action: {error: {message?: string} }) => {
    state.loading = false;
    state.error = action.error.message ?? 'An error occurred';
};

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (
            state, 
            action: PayloadAction<Task>
        ) => {
            state.tasks.push(action.payload);
        },
        updateTask: (
            state, 
            action: PayloadAction<Task>
        ) => {
            const index = state.tasks.findIndex(
                task => task.id === action.payload.id
            );
            if(index !== -1) {
                state.tasks[index] = action.payload;
            }
        },
        removeTask: (
            state, 
            action: PayloadAction<number>
        ) => {
            state.tasks = state.tasks.filter(
                task => task.id !== action.payload
            );
        },
        setTasks: (
            state, 
            action: PayloadAction<Task[]>
        ) => {
            state.tasks = action.payload;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTasks.pending, setLoading)
            .addCase(fetchTasks.fulfilled, 
                    (state, action: PayloadAction<Task[]>) => {
                state.loading = false;
                state.tasks = action.payload; 
            })
            .addCase(fetchTasks.rejected, setError)
        builder
            .addCase(addNewTask.pending, setLoading)
            .addCase(addNewTask.fulfilled, 
                    (state, action: PayloadAction<Task>) => {
                state.loading = false;
                state.tasks.push(action.payload);
            })
            .addCase(addNewTask.rejected, setError)

        builder
            .addCase(updateExistingTask.pending, setLoading)
            .addCase(updateExistingTask.fulfilled, 
                    (state, action: PayloadAction<Task>) => {
                state.loading = false;
                const index = state.tasks.findIndex(
                    t => t.id === action.payload.id
                );
                if(index !== -1) {
                    state.tasks[index] = action.payload;
                }
            })
            .addCase(updateExistingTask.rejected, setError);

        builder
            .addCase(removeExistingTask.pending, setLoading)
            .addCase(removeExistingTask.fulfilled, 
                    (state, action:PayloadAction<number>) => {
                state.loading = false;
                state.tasks = state.tasks.filter(
                    task => task.id !== action.payload
                );
            })
            .addCase(removeExistingTask.rejected, setError);
    }
});

export const { setTasks } = taskSlice.actions;
export default taskSlice.reducer;