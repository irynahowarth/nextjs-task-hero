'use client'; 

import { useEffect, useState } from "react";
import ProjectsTable from "../ui/projects/table";
import { fetchProjects } from "../lib/data";
import { Project } from "../lib/definitions";


export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(()=>{
    const fetchAndSetProjects = async () =>{
      setIsLoading(true);
      try{
        const projectData =  await fetchProjects()
        setProjects(projectData)
        console.log(projectData)
      } catch(error){
        console.error('Failed to fetch projects:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAndSetProjects()
  },[])
  

    return (
      <div className="">
        <h1 className="text-4xl font-bold">
        Projects Management Page
        </h1>
        <ProjectsTable projects={projects}/>
      </div>
    );
  }