import { FC, useCallback, useMemo, useState } from "react";
import { useAppDispatch } from "../../../../app/hooks";
import { useSelector} from "react-redux";
import TaskItem from "../taskItem/TaskItem";
import { updateExistingTask, removeExistingTask } from "../../taskSlice";
import { selectAllTasks } from '../../selectors';
import { Task } from "../../types";
import styled from "styled-components";

interface TaskListProps {
    filterStatus: string | null;
    filterPriority: string | null;
}

const EditingMessage = styled.div`
    color: blue;
    font-size: 12px;
    margin-top: 5px;
`

const TaskList: FC<TaskListProps> = ({ filterStatus, filterPriority }) => {
    const dispatch = useAppDispatch();
    const tasks = useSelector(selectAllTasks);
    const [selectedTaskId, setSelectedTaskId] = useState<number | null>(null);

    const handleEdit = useCallback((id: number) =>{
        console.log(`Редактировать задачу с ID ${id}`);
        setSelectedTaskId(id);
    }, [])  

    const handleDelete = useCallback((id: number) => {
        dispatch(removeExistingTask(id));
    },[dispatch]);

    const handleStatusChange = useCallback((id: number, newStatus: Task['status']) => {
        const taskToUpdate = tasks.find((task) => task.id === id);
        if (taskToUpdate) {
            const updatedTask = { ...taskToUpdate, status: newStatus };
            dispatch(updateExistingTask(updatedTask));
        }
    }, [dispatch, tasks]) 

    const filteredTasks = useMemo(() => {
        return tasks.filter((task:Task) => {
            const statusMatch = !filterStatus || task.status === filterStatus;
            const priorityMatch = !filterPriority || task.priority === filterPriority;
            return statusMatch && priorityMatch;
        });
    }, [tasks, filterStatus, filterPriority]); 

    return (
        <div>
            <h2>Список задач</h2>
            {filteredTasks.length > 0 ? (
                    filteredTasks.map((task: Task) => (
                        <div
                            key={task.id}
                        >
                            <TaskItem
                                task={task}
                                onEdit={handleEdit}
                                onDelete={handleDelete}
                                onStatusChange={handleStatusChange}
                            />
                            {selectedTaskId === task.id && (
                                <EditingMessage>
                                    Редактируется задача ID: {task.id}
                                </EditingMessage>
                            )}
                        </div>
                    ))
                ) : (
                    <p>Задачи не найдены</p>
                )}
        </div>
    );
};

export default TaskList;