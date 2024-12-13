'use server';

import { db } from "@/firebase";
import { collection, doc, addDoc, deleteDoc, serverTimestamp} from "firebase/firestore";
import { Project, Task } from "./definitions";


export async function createProject(projectName:string){
    const newProject = {
        name: projectName,
        createdAt: new Date().toISOString(),
    };

    try{
        const projectsCollection = collection(db, "projects");
        const docRef = await addDoc(projectsCollection, newProject);
        const projectsData: Project = {
            id: docRef.id,
            ...newProject,
        } as Project
        return projectsData

    } catch(error){
        console.error('Database Error:', error);
        throw new Error('Failed to add new Project.');
    }
  
}

export async function deleteProject(projectId: string): Promise<void>{
    try {
        const projectDocRef = doc(db, "projects", projectId);
        await deleteDoc(projectDocRef);
        console.log(`Project ${projectId} deleted successfully.`);
      } catch (error) {
        console.error("Error deleting project:", error);
        throw new Error("Failed to delete project.");
      }
}

export async function createTask(task: Partial<Task>): Promise<Task>{
    const newTask = {
      ...task,
      isCompleted: false,
      dueDate: task.dueDate || serverTimestamp(),
    };

    try {
      const tasksCollection = collection(db, "tasks")
      const docRef = await addDoc(tasksCollection, newTask);
      const taskData: Task = {
            id: docRef.id, 
            ...newTask 
        } as Task
        
    return taskData
        
    } catch (error) {
      console.error("Failed to add task:", error);
      throw new Error("Failed to add task.");
    }
  }