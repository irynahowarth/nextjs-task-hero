'use client'; 

import { useEffect, useState } from "react";
import { Task } from "../lib/definitions";
import { fetchTasks } from "../lib/data";
import TasksTable from "../ui/tasks/table";


export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [isLoading, setIsLoading] = useState(true);

  useEffect(()=>{
    const fetchAndSetTasks = async () =>{
      setIsLoading(true);
      try{
        const taskData = await fetchTasks();
        setTasks(taskData)
        console.log(taskData)
      }catch(error){
        console.error('Failed to fetch tasks:', error);
      } finally {
        setIsLoading(false);
      }
    }
    fetchAndSetTasks()
  },[])
    return (
      <div className="">
        <h1 className="text-4xl font-bold">
        Tasks
        </h1>
        <TasksTable tasks={tasks} setTasks={setTasks} />
      </div>
    );
  }