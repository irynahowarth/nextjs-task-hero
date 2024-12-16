import { CalendarDayProps } from '@/app/lib/definitions'
import { formatToISO } from '@/app/lib/utils'
import React from 'react'


export default function calendarDay({date, tasks}: CalendarDayProps) {
  return (
    <div className="border rounded p-2">
      <h2 className="text-lg font-bold">{formatToISO(date)}</h2>
      <ul className="space-y-2 mt-2">
        {tasks.length > 0 ? (
          tasks.map((task) => (
            <li key={task.id} className="flex justify-between items-center">
              <span className={task.isCompleted ? "line-through" : ""}>{task.name}</span>
              <input
                type="checkbox"
                checked={task.isCompleted}
              />
            </li>
          ))
        ) : (
          <li className="text-gray-500">No tasks</li>
        )}
      </ul>
    </div>
  )
}