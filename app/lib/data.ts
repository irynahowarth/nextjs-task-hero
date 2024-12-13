import { db } from "@/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";
import { Project } from "./definitions";

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