'use client'; 

import { useEffect, useState } from "react";
import ProjectsTable from "../ui/projects/table";
import { fetchProjects } from "../lib/data";
import { Project } from "../lib/definitions";
import { createProject, updateProject } from "../lib/actions";
import ProjectModal from "../ui/projects/ProjectModal";


export default function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [newProjectName, setNewProjectName] = useState("");
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  
  useEffect(()=>{
    const fetchAndSetProjects = async () =>{
      setIsLoading(true);
      try{
        const projectData =  await fetchProjects()
        setProjects(projectData)
      } catch(error){
        console.error('Failed to fetch projects:', error);
      } finally {
        setIsLoading(false);
      }
    }

    fetchAndSetProjects()
  },[])
  
  
  const handleSaveProject = async (project: Partial<Project>) => {
   
    try {
      if (project?.id) {
        // Update existing project
        const updatedProject = await updateProject(project as Project);
        setProjects((prev) =>
          prev.map((t) => (t.id === updatedProject.id ? updatedProject : t))
        );
      } else {
        // Create a new project
        const addedProject = await createProject(project);
        setProjects((prev) => [...prev, addedProject]);
      }
      setIsModalOpen(false);
      setSelectedProject(null);
    } catch (error) {
      console.error("Failed to save task:", error);
      alert("Failed to save task.");
    }
  };

  const openModal = (project: Project | null = null) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  }

    return (
      <div className="">
        <h1 className="text-4xl font-bold">
        Projects
        </h1>
        {/* Add New Project Section */}
        <div className="mb-6">
          <button
            onClick={()=>openModal(null)}
            className="bg-blue-500 text-white px-4 py-2 rounded"
          >
            Add Project
          </button>
        </div>
        <ProjectsTable 
          projects={projects} 
          setProjects={setProjects}
          onEditProject={(project) => openModal(project)} 
        />
      {/* Task Modal */}
      {isModalOpen && (
        <ProjectModal
          onClose={() => setIsModalOpen(false)}
          onSave={handleSaveProject}
          initialProject={selectedProject}
        />
      )}
      </div>
    );
  }