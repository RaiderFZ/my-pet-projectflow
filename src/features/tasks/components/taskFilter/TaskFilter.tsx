import { FC } from 'react';

interface TaskFilterProps {
    onStatusChange: (status: string | null) => void;
    onPriorityChange: (priority: string | null) => void;
}

const TaskFilter: FC<TaskFilterProps> = ({ onStatusChange, onPriorityChange }) => {

    return (
        <div>
            <label>Фильтр по статусу:</label>
            <select onChange={(e) => onStatusChange(e.target.value || null)}>
                <option value="">Все</option>
                <option value="todo">Todo</option>
                <option value="in-progress">In Progress</option>
                <option value="done">Done</option>
            </select>

            <label>Фильтр по приоритету:</label>
            <select onChange={(e) => onPriorityChange(e.target.value || null)}>
                <option value="">Все</option>
                <option value="low">Низкий</option>
                <option value="medium">Средний</option>
                <option value="high">Высокий</option>
            </select>
        </div>
    )
}

export default TaskFilter;