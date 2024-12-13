'use server';

import { db } from "@/firebase";
import { collection, addDoc } from "firebase/firestore";
import { Project } from "./definitions";


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