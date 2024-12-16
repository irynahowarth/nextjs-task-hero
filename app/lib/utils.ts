


/**
 * Helper function to calculate the number days range around today.
 */
export function calculateWeekDays(today: Date, totalDays: number = 5): Date[] {
    if (totalDays % 2 === 0) {
        throw new Error("totalDays must be an odd number to ensure a center day.");
      }
    
    const halfRange = Math.floor(totalDays / 2);
    const days = [];
  
    for (let i = -halfRange; i <= halfRange; i++) {
      const newDate = new Date(today);
      newDate.setDate(today.getDate() + i);
      days.push(newDate);
    }
    return days;
  }

  /**
 * Helper function to format a Date object to ISO string (YYYY-MM-DD).
 */
export function formatToISO(date: Date): string {
    return date.toISOString().split("T")[0]; // Extract only the date part
  }

/**
 * Helper function to check if two dates are the same (ignores time).
 */
export function isSameDay(dueDate: string, day: Date): boolean {
    const dueDateObj = new Date(dueDate);
    return (
      dueDateObj.getFullYear() === day.getFullYear() &&
      dueDateObj.getMonth() === day.getMonth() &&
      dueDateObj.getDate() === day.getDate()
    );
  }
/**
 * Helper function to get day of the week
 */
  export function getDayOfWeek(date: Date): string {
    const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    return daysOfWeek[date.getDay()];
  }
/**
 * Helper function to get DD/MM date format for calendar
 */
  export function formatDateToDDMM(date: Date): string {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0");
    return `${day}/${month}`;
  }