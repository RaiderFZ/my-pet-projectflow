import { configureStore } from '@reduxjs/toolkit';
import { rootReducer } from './reducers';
import { myLogger } from './middleware/myLogger';

const devMode = process.env.NODE_ENV !== 'production';

export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware()
            .concat(myLogger), 
    devTools: devMode,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;