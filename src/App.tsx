import { useAppSelector, useAppDispatch } from "./app/hooks";
import { setTasks } from "./features/tasks/taskSlice";

function App() {

  const myDate = useAppSelector(state => state.tasks.tasks);
  console.log(myDate);
  return (
    <div className="App">
      
    </div>
  );
}

export default App;
