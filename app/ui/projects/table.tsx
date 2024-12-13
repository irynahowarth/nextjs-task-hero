import React from 'react'
import { Project, ProjectsTableProps } from '@/app/lib/definitions'
import { deleteProject } from '@/app/lib/actions';

export default function ProjectsTable({projects, setProjects}:ProjectsTableProps) {
    const handleDeleteProject = async (projectId: string) => {
        const confirmDelete = window.confirm("Are you sure you want to delete this project?");
        if (!confirmDelete) return;
    
        try {
          await deleteProject(projectId);
          setProjects((prev:Project[]) => prev.filter((project) => project.id !== projectId));
        } catch (error) {
          console.error("Failed to delete project:", error);
        }
      };

  return (
    <div>
    {/* Project List */}
      <ul className="space-y-4">
        {projects.map((project) => (
          <li key={project.id} className="flex justify-between items-center border p-2 rounded">
            <span>{project.name}</span>
            <div className="flex gap-2">
                <button className="bg-gray-500 text-white px-4 py-1 rounded">
                View Tasks
                </button>
                <button
                    onClick={() => handleDeleteProject(project.id)}
                    className="bg-red-500 text-white px-4 py-1 rounded"
                >
                    Delete
                </button>
              </div>
          </li>
        ))}
      </ul>
    </div>
  )
}