'use client';
import {useState, useEffect} from "react"
import { Task } from "./lib/definitions";
import {calculateWeekDays, formatToISO} from './lib/utils'
import CalendarDay from "./ui/dashboard/calendarDay";
import { ensureTaskInstances, fetchTasksForWeek } from "./lib/data";

export default function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [currentDate, setCurrentDate] = useState(new Date())
  const totalDays = 5; 
  const days = calculateWeekDays(currentDate,totalDays); 

   // Load `currentDate` from localStorage only in the browser
   useEffect(() => {
    const savedDate = localStorage.getItem('currentDate');
    if (savedDate) {
      setCurrentDate(new Date(savedDate));
    }
  }, []);
  
  // Save `currentDate` to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('currentDate', currentDate.toISOString());
  }, [currentDate]);
  

  useEffect(() => {
    const fetchWeeklyTasks = async () => {
      // Ensure task instances for all days in the range
      for (const day of days) {
        await ensureTaskInstances(formatToISO(day));
      }
      const startDate = formatToISO(days[0]);
      const endDate = formatToISO(days[days.length - 1]);
      // Fetch the tasks for the week
      const weeklyTasks = await fetchTasksForWeek(startDate, endDate);
      setTasks(weeklyTasks);
    };

    fetchWeeklyTasks();
  }, [currentDate]);

  const updateTaskCompletion = (taskId: string, date: string, isCompleted: boolean) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === taskId && task.dueDate === date 
          ? { ...task, isCompleted }
          : task 
      )
    );
  };

  // Navigation handlers
  const goToPreviousDays = () => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(newDate.getDate() - Math.floor(totalDays/2));
      return newDate;
    });
  };
  const goToNextDays = () => {
    setCurrentDate((prev) => {
      const newDate = new Date(prev);
      newDate.setDate(newDate.getDate() + Math.floor(totalDays/2));
      return newDate;
    });
  };
  const resetToToday = () => {
    setCurrentDate(new Date());
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      {/* Navigation Buttons */}
      <div className="flex justify-center gap-4 mb-6">
        <button
          onClick={goToPreviousDays}
          className="px-4 py-2 bg-gray-500 text-white rounded"
        >
          ← Previous
        </button>
        <button
          onClick={resetToToday}
          className="px-4 py-2 bg-blue-500 text-white rounded"
        >
          Today
        </button>
        <button
          onClick={goToNextDays}
          className="px-4 py-2 bg-gray-500 text-white rounded"
        >
          Next →
        </button>
      </div>
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
            tasks={tasks
              .filter((task) => task.instances.some(instance=>instance.date === formatToISO(day)))
              .map((task) => ({
                ...task,
                isCompleted: task.instances.find(
                  (instance) => instance.date === formatToISO(day)
                )?.isCompleted || false,
              }))
            }
            onToggleTaskCompletion={updateTaskCompletion}
          />
        ))}
      </div>
    </div>
  );
}
