import { useAppSelector } from "./app/hooks";


function App() {

  const myDate = useAppSelector(state => state.tasks.tasks);
  console.log(myDate);
  return (
    <div className="App">
      
    </div>
  );
}

export default App;
