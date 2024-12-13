import { db } from "@/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { Project, Task } from "./definitions";

export async function fetchProjects():Promise<Project[]> {
    try{
      const projectsCollection = collection(db, "projects");
      const projectsSnapshot = await getDocs(projectsCollection);
      const projectsData: Project[] = projectsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Project[];
      return projectsData
    } catch (error){
        console.error('Database Error:', error);
        throw new Error('Failed to fetch Projects.');
    }
}

export async function fetchTasks():Promise<Task[]> {
  try{
    const tasksCollection = collection(db, "tasks");
      const tasksSnapshot = await getDocs(tasksCollection);
      const tasksData: Task[] = tasksSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      })) as Task[];
    return tasksData

  }catch(error){
      console.error('Database Error:', error);
      throw new Error('Failed to fetch Tasks.');
  }
}