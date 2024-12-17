'use server';

import { db } from "@/firebase";
import { collection, doc, addDoc, deleteDoc, serverTimestamp, updateDoc, setDoc, getDoc} from "firebase/firestore";
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
    const { id, ...newTask } = task;
    const finalTask = {
      ...newTask,
      isCompleted: false,
      dueDate: newTask.dueDate || serverTimestamp(),
    };

    try {
      const tasksCollection = collection(db, "tasks")
      const docRef = await addDoc(tasksCollection, finalTask);
      return { id: docRef.id, ...finalTask } as Task;
        
    } catch (error) {
      console.error("Failed to add task:", error);
      throw new Error("Failed to add task.");
    }
  }

  export async function deleteTask(taskId: string): Promise<void>{
    try {
        const taskDocRef = doc(db, "tasks", taskId);
        await deleteDoc(taskDocRef);
        console.log(`Task ${taskId} deleted successfully.`);
      } catch (error) {
        console.error("Error deleting task:", error);
        throw new Error("Failed to delete task.");
      }
}
export async function updateTask(task: Partial<Task>): Promise<Task> {
  const { id, ...fieldsToUpdate } = task;

  if (!id) {
    throw new Error("Task ID is required for update.");
  }

  // Filter out undefined values
  const filteredFields = Object.fromEntries(
    Object.entries(fieldsToUpdate).filter(([_, value]) => value !== undefined)
  );

  const taskDocRef = doc(db, "tasks", id);

  try {
    await updateDoc(taskDocRef, fieldsToUpdate);

    return { id, ...fieldsToUpdate } as Task;
  } catch (error) {
    console.error("Failed to update task:", error);
    throw new Error("Failed to update task.");
  }
}

export async function toggleTaskCompletion(taskId: string, isCompleted: boolean) {
  try {
    const taskDoc = doc(db, "tasks", taskId);
    // Fetch the existing task to preserve its fields
    const snapshot = await getDoc(taskDoc);
    const existingTask = snapshot.data();

    if (!existingTask) {
      throw new Error("Task not found.");
    }
    await updateDoc(taskDoc, {
      ...existingTask,
      dueDate: existingTask.dueDate,
      isCompleted,
    });
  } catch (error) {
    console.error("Failed to toggle task completion:", error);
  }
}