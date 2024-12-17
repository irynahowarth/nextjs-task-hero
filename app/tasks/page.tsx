'use client'; 

import { useEffect, useState } from "react";
import { Task, Project } from "../lib/definitions";
import { fetchTasks, fetchProjects } from "../lib/data";
import { createTask, updateTask } from "../lib/actions";
import TasksTable from "../ui/tasks/table";
import TaskModal from "../ui/tasks/TaskModal";



export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTask, setSelectedTask] = useState<Task | null>(null);


  useEffect(()=>{
    const fetchAndSetData = async () => {
      try {
        const [taskData, projectData] = await Promise.all(
          [fetchTasks(), fetchProjects()]
        );
        setTasks(taskData);
        setProjects(projectData);
      } catch (error) {
        console.error("Failed to fetch data:", error);
      }
    };

    fetchAndSetData();
  },[])


  const handleSaveTask = async (task: Partial<Task>) => {
   
    try {
      if (task?.id) {
        // Update existing task
        const updatedTask = await updateTask(task as Task);
        setTasks((prev) =>
          prev.map((t) => (t.id === updatedTask.id ? updatedTask : t))
        );
      } else {
        // Create a new task
        const addedTask = await createTask(task);
        setTasks((prev) => [...prev, addedTask]);
      }
      setIsModalOpen(false);
      setSelectedTask(null);
    } catch (error) {
      console.error("Failed to save task:", error);
      alert("Failed to save task.");
    }
  };
  

  const openModal = (task: Task | null = null) => {
    setSelectedTask(task);
    setIsModalOpen(true);
  }

    return (
      <div className="">
        <h1 className="text-4xl font-bold">
        Tasks
        </h1>
        <button
          onClick={()=>openModal(null)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Task
        </button>
        <TasksTable 
          tasks={tasks} 
          setTasks={setTasks} 
          onEditTask={(task) => openModal(task)} 
        />
         {/* Task Modal */}
        {isModalOpen && (
          <TaskModal
            onClose={() => setIsModalOpen(false)}
            onSave={handleSaveTask}
            projectList={projects}
            initialTask={selectedTask}
          />
        )}
      </div>
    );
  }