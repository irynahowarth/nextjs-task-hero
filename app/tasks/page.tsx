'use client'; 

import { useEffect, useState } from "react";
import { Task, Project } from "../lib/definitions";
import { fetchTasks, fetchProjects } from "../lib/data";
import { createTask } from "../lib/actions";
import TasksTable from "../ui/tasks/table";
import TaskModal from "../ui/tasks/TaskModal";



export default function Tasks() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [projects, setProjects] = useState<Project[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

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

   // Create new Task and add it to Firebase
  const handleAddTask = async (newTask: Partial<Task>) => {
    try {
      const addedTask = await createTask(newTask);
      setTasks((prev) => [...prev, addedTask]);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to add task:", error);
    }
  };
    return (
      <div className="">
        <h1 className="text-4xl font-bold">
        Tasks
        </h1>
        <button
          onClick={() => setIsModalOpen(true)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Task
        </button>
        <TasksTable tasks={tasks} setTasks={setTasks} />
         {/* Task Modal */}
        {isModalOpen && (
          <TaskModal
            onClose={() => setIsModalOpen(false)}
            onSave={handleAddTask}
            projectList={projects}
          />
        )}
      </div>
    );
  }