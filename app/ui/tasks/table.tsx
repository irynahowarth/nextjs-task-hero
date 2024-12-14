import React from 'react'
import { Task, TasksTableProps } from '@/app/lib/definitions'
import { deleteTask } from '@/app/lib/actions';

export default function TasksTable({tasks, setTasks}:TasksTableProps) {
  const handleDeleteTask = async (taskId: string) => {
    const confirmDelete = window.confirm("Are you sure you want to delete this task?");
    if (!confirmDelete) return;

    try {
      await deleteTask(taskId);
      setTasks((prev:Task[]) => prev.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Failed to delete task", error);
    }
  };
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
                <button
                    onClick={() => handleDeleteTask(task.id)}
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