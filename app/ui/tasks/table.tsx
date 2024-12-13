import React from 'react'
import { Task, TasksTableProps } from '@/app/lib/definitions'

export default function TasksTable({tasks, setTasks}:TasksTableProps) {
    return (
    <div>
    {/* Tasks List */}
      <ul className="space-y-4">
        {tasks.map((task:Task) => (
          <li key={task.id} className="flex justify-between items-center border p-2 rounded">
            <span>Project:{task.projectId}</span>
            <span>{task.name}</span>
            <span>Due:{task.dueDate}</span>
            <div className="flex gap-2">
                <button className="bg-gray-500 text-white px-4 py-1 rounded">
                View Details
                </button>
              </div>
          </li>
        ))}
      </ul>
    </div>
  )
}