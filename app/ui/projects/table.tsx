import React from 'react'

type Project = {
    id: string,
    name: string,
    createdAt: string
  };

export default function ProjectsTable({projects}:{projects: Project[]}) {
  return (
    <div>
    {/* Project List */}
      <ul className="space-y-4">
        {projects.map((project) => (
          <li key={project.id} className="flex justify-between items-center border p-2 rounded">
            <span>{project.name}</span>
            <button className="bg-gray-500 text-white px-4 py-1 rounded">
              View Tasks
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}