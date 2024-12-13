import { db } from "@/firebase";
import { collection, getDocs, addDoc } from "firebase/firestore";

export async function fetchProjects() {
    try{
      const projectsCollection = collection(db, "projects");
      const projectsSnapshot = await getDocs(projectsCollection);
      const projectsData = projectsSnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data(),
      }))
      return projectsData
    } catch (error){
        console.error('Database Error:', error);
        throw new Error('Failed to fetch Projects.');
    }
}