import { FC } from "react";
import { Task } from "../../types";
import { format, isValid } from "date-fns";

interface TaskItemProps {
    task: Task;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
    onStatusChange: (id: number, newStatus: Task['status']) => void;
}

const TaskItem: FC<TaskItemProps> = ({task, onEdit, onDelete, onStatusChange}) => {
    return (
        <div>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>
                <span>Приоритет:</span> {task.priority} | <span>Статус:</span> {task.status}
            </p>
            <p>
                <span>Дата выполнения:</span> 
                {
                    task.dueData 
                        ? isValid(new Date(task.dueData))
                            ? format(new Date(task.dueData), "dd.MM.yyyy")
                            : "Не указана"
                        : "Не указана"
                }
            </p>
            <div>
                <button
                    onClick={() => onEdit(task.id)}
                >
                    ✏️ Редактировать
                </button>
                <button
                    onClick={() => onDelete(task.id)}
                >
                    🗑 Удалить
                </button>
                {task.status !== "done" && (
                    <button onClick={() => onStatusChange(task.id, "done")}>✔️ Выполнено</button> 
                )}
                {task.status !== "in-progress" && task.status !== "done" && (
                    <button onClick={() => onStatusChange(task.id, "in-progress")}>
                        🚧 В процессе
                    </button>
                )}
                {task.status !== "todo" && (
                    <button onClick={() => onStatusChange(task.id, "todo")}>❌ Отменено</button>
                )}
            </div>
        </div>
)}

export default TaskItem;