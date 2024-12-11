import tasksReducer from '../../features/tasks/taskSlice';

export const rootReducer = {
    tasks: tasksReducer,
    // users: usersReducer,
    // добавляйте новые редюсеры по мере роста проекта
};