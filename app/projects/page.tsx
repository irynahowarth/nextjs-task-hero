'use client'; 

import { useEffect, useState } from "react";
import ProjectsTable from "../ui/projects/table";
import { fetchProjects } from "../lib/data";
import { Project } from "../lib/definitions";
import { createProject } from "../lib/actions";


export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [newProjectName, setNewProjectName] = useState("");
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
  
  // Add a new project to Firebase
  const addProject = async ()=>{
    if (newProjectName.trim() === "") return;
    try{
      const newProject = await createProject(newProjectName)
      setProjects(prev => [...prev, newProject]);
      setNewProjectName("")
    } catch(error){
      console.error('Failed to create new project:', error);
    }
  }

    return (
      <div className="">
        <h1 className="text-4xl font-bold">
        Projects
        </h1>
        {/* Add New Project Section */}
        <div className="mb-6">
          <input
            type="text"
            value={newProjectName}
            onChange={(e) => setNewProjectName(e.target.value)}
            placeholder="Enter project name"
            className="border px-2 py-1 mr-2"
          />
          <button
            onClick={addProject}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Project
          </button>
        </div>
        <ProjectsTable projects={projects}/>
      </div>
    );
  }