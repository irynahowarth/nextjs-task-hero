'use client';
import {useState, useEffect} from "react"
import { Task } from "./lib/definitions";
import {calculateWeekDays, formatToISO} from './lib/utils'
import CalendarDay from "./ui/dashboard/calendarDay";
import { fetchTasksForWeek } from "./lib/data";

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const today = new Date();
  const totalDays = 5; 
  const days = calculateWeekDays(today,totalDays); 

  useEffect(() => {
    const fetchWeeklyTasks = async () => {
      const startDate = formatToISO(days[0]);
      const endDate = formatToISO(days[days.length - 1]);
      const weeklyTasks = await fetchTasksForWeek(startDate, endDate);
      setTasks(weeklyTasks);
    };

    fetchWeeklyTasks();
  }, []);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <div 
        className={`grid gap-4`}
        style={{
          gridTemplateColumns: `repeat(${totalDays}, minmax(0, 1fr))`,
        }}
      >
      {days.map((day, index) => (
         <CalendarDay
            key={index}
            date={day}
            tasks={tasks.filter(
              (task) => task.dueDate === formatToISO(day)
            )}
          />
        ))}
      </div>
    </div>
  );
}
