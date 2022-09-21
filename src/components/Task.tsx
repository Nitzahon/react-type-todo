import React, { useEffect, useState } from "react";
import { ITask } from "../Interfaces";

interface Props {
  task: ITask;
  deleteTask(taskIDToDelete: number): void;
  updateTask(taskIDToDelete: number, task:ITask):void;
}

const TodoTask = ({ task, deleteTask, updateTask }: Props) => {
    const [firstRend,setFirstRend] = useState<boolean>(true);
    const [description,setDescription] = useState<string>(task.description);
    const [active,setActive] = useState<boolean>(task.active);
    useEffect(() => {
        if(firstRend){
            setFirstRend(false);
            return;
        }
        let newTask:ITask= {id:task.id, description:description, active:active};
        updateTask(task.id, newTask);
    }, [description, active, firstRend])
    
    return (
    <div className="task">
      <div className="content">
        
        <span>ID:{task.id}</span>
        <input type="text" value={description} onChange={(e)=>{setDescription(e.target.value)}}/>
        Active:<input type="checkbox" checked={active} onChange={(e)=>{setActive(!active)}}/>
      </div>
      <button
        onClick={() => {
          deleteTask(task.id);
        }}
      >
        X
      </button>
    </div>
  );
};

export default TodoTask;