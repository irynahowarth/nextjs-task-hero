import { db } from "@/firebase";
import { collection, getDocs, addDoc, query, where, doc, getDoc, setDoc  } from "firebase/firestore";
import { Project, Task, TaskInstance } from "./definitions";

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

    const tasksWithInstances = await Promise.all(
    tasksSnapshot.docs.map(async (taskDoc) => {
      const task = taskDoc.data() as Task;

      // Get all task instances for this task
      const instancesCollection = collection(db, `tasks/${taskDoc.id}/taskInstances`);
      const instancesSnapshot = await getDocs(instancesCollection);

      // const instanceDocRef = doc(db, `tasks/${taskDoc.id}/taskInstances/${task.dueDate}`);
      // const instanceDoc = await getDoc(instanceDocRef);
      const instances = instancesSnapshot.docs.map((instanceDoc) => ({
        ...instanceDoc.data(),
        id: instanceDoc.id,
      }));

      return {
        ...task,
        id: taskDoc.id,
        instances,
      };
    })
  );
    return tasksWithInstances;

  } catch (error) {
    console.error("Failed to fetch tasks for the week:", error);
    throw new Error("Failed to fetch tasks.");
  }
}

export async function ensureTaskInstances(date: string,): Promise<void> {
  try {
    const tasksCollection = collection(db, "tasks");
    const tasksSnapshot = await getDocs(tasksCollection);

    await Promise.all(
      tasksSnapshot.docs.map(async (taskDoc) => {
        const task = taskDoc.data() as Task;
        if (task.repeatOption === "none") return;
        
        const instanceDocRef = doc(db, `tasks/${taskDoc.id}/taskInstances/${date}`);
        const instanceDoc = await getDoc(instanceDocRef);
        
        if (!instanceDoc.exists()) {
          await setDoc(instanceDocRef, { date, isCompleted: false });
        }
      })
    );
  } catch (error) {
    console.error("Failed to ensure task instances:", error);
    throw new Error("Failed to ensure task instances.");
  }
}