import {FC, useState, FormEvent } from 'react';
import { Task } from '../../types';

interface TaskFormProps {
    onSubmit: (task: Omit<Task, "id" | "createdAt" | "updateAt">) => void;
    initialData?: Omit<Task, "id" | "createdAt" | "updateAt">;
}

const TaskForm: FC<TaskFormProps> = ({onSubmit, initialData}) => {
    const [title, setTitle] = useState(initialData?.title || "");
    const [description, setDescription] = useState(initialData?.description || "");
    const [priority, setPriority] = useState(initialData?.priority || "low");
    const [dueDate, setDueDate] = useState(initialData?.dueData || "");

    const handleSubmit = (e: FormEvent) => {
        e.preventDefault();

        if(!title.trim() || !dueDate) {
            alert("Пожалуйста, заполните название и дату выполнения");
            return;
        }
        onSubmit({
            title,
            description,
            priority,
            dueData: dueDate,
            status: "todo",
            create: new Date().toISOString()
        });

        setTitle("");
        setDescription("");
        setPriority("low");
        setDueDate("");
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>Название задачи:</label>
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Введите название"
                required
            />

            <label>Описание:</label>
            <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Описание задачи"
            />

            <label>Приоритет:</label>
            <select value={priority} onChange={(e) => setPriority(e.target.value as "low" | "medium" | "high")}>
                <option value="low">Низкий</option>
                <option value="medium">Средний</option>
                <option value="high">Высокий</option>
            </select>

            <label>Дата выполнения:</label>
            <input
                type="date"
                value={dueDate}
                onChange={(e) => setDueDate(e.target.value)}
                required
            />

            <button type="submit">Сохранить</button>
        </form>
    )
}

export default TaskForm;