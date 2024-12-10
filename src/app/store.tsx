import { configureStore } from '@reduxjs/toolkit';
import taskReduser from '../features/tasks/taskSlice';

export const store = configureStore({
    reducer: {
        tasks: taskReduser
    }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;