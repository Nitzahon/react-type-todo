import React, { FC, ChangeEvent, useState, useEffect } from "react";
// import "./App.css";
import TodoTask from "./components/Task";
import { ITask } from "./interfaces";
import Appstore from "./stores/Appstore";
const App: FC = () => {
    const [firstRend,setFirstRend] = useState<boolean>(true);
  const [task, setTask] = useState<string>("");
  const [id, setid] = useState<number>(Math.max(...Appstore.getTasks().map((o:ITask)=>o.id))+1);
  const [todoList, setTodoList] = useState<ITask[]>(Appstore.getTasks());
  const [filterSearch, setFilterSearch]= useState<string>("");
  const handleChange = (event: ChangeEvent<HTMLInputElement>): void => {
    if (event.target.name === "task") {
      setTask(event.target.value);
   
    } 
    switch(event.target.name)
 {
      case "task":
        setTask(event.target.value);
        break;
      case "filter":
        setFilterSearch(event.target.value);
      default:
        break;
    }
  };

  const addTask = (): void => {
    const newTask:ITask = { id: id, description: task, active: true };
    setid(id+1);
    setTodoList(Appstore.addTasks(newTask)||todoList);
    setTask("");

  };
  const updateTask = (taskIdToUpdate: number, taskUpdate:ITask): void => {
    
    setTodoList(Appstore.setTasks(taskUpdate)||[]);
    setTask("");
}
  const completeTask = (taskIdToDelete: number): void => {
    setTodoList(Appstore.deleteTasks(taskIdToDelete)||[]);
  };
  
  
  return (
    <div className="App">
      <div className="header">
        <div className="inputContainer">
          <input
            type="text"
            placeholder="Task..."
            name="task"
            value={task}
            onChange={handleChange}
          />
          {/* <input
            type="number"
            placeholder="Deadline (in Days)..."
            name="deadline"
            value={deadline}
            onChange={handleChange}
          /> */}
        </div>
        <button onClick={addTask}>Add Task</button>
      </div>
      <br/>
      <input
            type="text"
            placeholder="filter..."
            name="filter"
            value={filterSearch}
            onChange={handleChange}
          />
      <div className="todoList">
        {todoList.filter((task: ITask)=>task.description.includes(filterSearch)).map((task: ITask) => {
          return <TodoTask key={task.id} task={task} deleteTask={completeTask} updateTask={updateTask} />;
        })}
      </div>
    </div>
  );
};

export default App;