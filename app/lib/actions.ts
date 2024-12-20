'use server';

import { db } from "@/firebase";
import { collection, doc, addDoc, deleteDoc, serverTimestamp, updateDoc, setDoc, getDoc} from "firebase/firestore";
import { Project, Task } from "./definitions";


export async function createProject(project: Partial<Project>){
    const { id, ...newProject } = project;

    const finalProject = {
      ...newProject,
      createdAt: newProject?.createdAt || new Date().toISOString(),
    };


    try{
        const projectsCollection = collection(db, "projects");
        const docRef = await addDoc(projectsCollection, finalProject);
        const projectsData: Project = {
            id: docRef.id,
            ...finalProject,
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
export async function updateProject(project: Partial<Project>): Promise<Project> {
  const { id, ...fieldsToUpdate } = project;

  if (!id) {
    throw new Error("Project ID is required for update.");
  }

  // Filter out undefined values
  const filteredFields = Object.fromEntries(
    Object.entries(fieldsToUpdate).filter(([_, value]) => value !== undefined)
  );

  const projectDocRef = doc(db, "projects", id);

  try {
    await updateDoc(projectDocRef, fieldsToUpdate);

    return { id, ...fieldsToUpdate } as Project;
  } catch (error) {
    console.error("Failed to update project:", error);
    throw new Error("Failed to update project.");
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

export async function toggleTaskCompletion(taskId: string, date: string, isCompleted: boolean): Promise<void> {
  try {
    const instanceDocRef = doc(db, `tasks/${taskId}/taskInstances/${date}`);
    await setDoc(instanceDocRef, { date, isCompleted }, { merge: true });
    console.log("Task completion toggled successfully");
  } catch (error) {
    console.error("Failed to toggle task completion:", error);
    throw new Error("Failed to toggle task completion.");
  }
}