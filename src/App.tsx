import { useEffect, useState } from "react";
import TaskList from "./features/tasks/components/taskList/TaskList";
import TaskForm from "./features/tasks/components/taskForm/TaskForm";
import TaskFilter from "./features/tasks/components/taskFilter/TaskFilter";
import { useAppDispatch } from "./app/hooks";
import { addNewTask, fetchTasks } from "./features/tasks/taskSlice";

const App = () => {
  const dispatch = useAppDispatch();

  const [filterStatus, setFilterStatus] = useState<string | null>(null);
  const [filterPriority, setFilterPriority] = useState<string | null>(null)

  const handleAddTask = (taskData: any) => {
    dispatch(addNewTask(taskData));
  }

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  return (
    <div className="App">
        <h1>Управление задачами</h1>
        <TaskForm onSubmit={handleAddTask} />
        <TaskFilter
            onStatusChange={setFilterStatus}
            onPriorityChange={setFilterPriority}
        />
        <TaskList filterStatus={filterStatus} filterPriority={filterPriority} />
    </div>
  );
}

export default App;
