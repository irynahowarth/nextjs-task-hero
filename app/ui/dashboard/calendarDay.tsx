import { toggleTaskCompletion } from '@/app/lib/actions';
import { CalendarDayProps } from '@/app/lib/definitions'
import { formatDateToDDMM, formatToISO, getDayOfWeek } from '@/app/lib/utils'
import React, { useState } from 'react'


export default function calendarDay({date, tasks, onToggleTaskCompletion}: CalendarDayProps) {
   
    const handleToggleTaskCompletion = async (taskId: string, isCompleted: boolean) => {
      try{
        await toggleTaskCompletion(taskId, formatToISO(date), isCompleted) // Update Firebase
          onToggleTaskCompletion(taskId,formatToISO(date), isCompleted); // Update local state in Dashboard
        }catch(error){
          console.error("Failed to toggle task completion:", error);
        }
    };

  return (
    <div className="border rounded p-2">
    <h3 className="text-lg font-bold">{getDayOfWeek(date)}</h3>
    <p className="text-sm text-gray-600">{formatDateToDDMM(date)}</p>
      <ul className="space-y-2 mt-2">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <li key={task.id} className="flex justify-between items-center">
              <input
                id={`task-${task.id}-${formatToISO(date)}`}
                type="checkbox"
                checked={task.isCompleted}
                onChange={() => handleToggleTaskCompletion(task.id, !task.isCompleted)}
              />
              <label htmlFor={`task-${task.id}-${formatToISO(date)}`} className={task.isCompleted ? "line-through" : ""}>{task.name}</label>
            </li>
          ))
        ) : (
          <li className="text-gray-500">No tasks</li>
        )}
      </ul>
    </div>
  )
}