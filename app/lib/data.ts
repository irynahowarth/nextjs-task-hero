import { db } from "@/firebase";
import { collection, getDocs, addDoc, query, where } from "firebase/firestore";
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

    const tasksData: Task[] = tasksSnapshot.docs.map(doc => { 
      const data = doc.data()
      return{
        id: doc.id,
        ...data,
        dueDate:  data.dueDate && typeof data.dueDate.toDate === "function"
        ? data.dueDate.toDate().toISOString()
        : data.dueDate || ""
        
      }}) 
    return tasksData

  }catch(error){
      console.error('Database Error:', error);
      throw new Error('Failed to fetch Tasks.');
  }
}

export async function fetchTasksForWeek(
  startDate: string, 
  endDate: string): Promise<Task[]> {
  try {
    const tasksCollection = collection(db, "tasks");
    const q = query(
      tasksCollection,
      where("dueDate", ">=", startDate),
      where("dueDate", "<=", endDate)
    );
    const tasksSnapshot = await getDocs(q);
    return tasksSnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Task[];
  } catch (error) {
    console.error("Failed to fetch tasks for the week:", error);
    throw new Error("Failed to fetch tasks.");
  }
}