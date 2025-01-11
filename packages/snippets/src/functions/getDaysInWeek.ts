type Day = {
  date: string; // ISO formatted date (YYYY-MM-DD)
  isCurrentMonth: boolean; // Whether the day is part of the current month
  isToday: boolean; // Whether the day is today
  isSelected: boolean; // Whether the day is selected
  isDayOff: boolean; // Whether the day is a day off
  events: any[]; // Placeholder for events, can be refined based on actual event structure
};

const GetDaysInWeek = (year: number, month: number): Day[] => {
  const days: Day[] = [];
  const uniqueDates = new Set<string>();
  const today = new Date().toISOString().split("T")[0];

  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);

  const firstWeekDay = firstDayOfMonth.getDay(); // Get the day of the week (0-6, Sun-Sat)
  const lastDate = lastDayOfMonth.getDate();

  // Add empty slots for days before the first day of the month
  for (let i = 0; i < firstWeekDay; i++) {
    const prevMonthDate = new Date(year, month, i - firstWeekDay + 1)
      .toISOString()
      .split("T")[0];
    if (!uniqueDates.has(prevMonthDate)) {
      days.push({
        date: prevMonthDate,
        isCurrentMonth: false,
        isToday: false,
        isSelected: false,
        isDayOff: false,
        events: [],
      });
      uniqueDates.add(prevMonthDate);
    }
  }

  // Add days for the current month
  for (let i = 1; i <= lastDate; i++) {
    const currentDate = new Date(year, month, i).toISOString().split("T")[0];
    if (!uniqueDates.has(currentDate)) {
      days.push({
        date: currentDate,
        isCurrentMonth: true,
        isToday: currentDate === today,
        isSelected: false,
        isDayOff: false,
        events: [],
      });
      uniqueDates.add(currentDate);
    }
  }

  // Add empty slots for days after the last day of the month
  const remainingSlots = (7 - (days.length % 7)) % 7; // Ensure the grid completes a week
  for (let i = 1; i <= remainingSlots; i++) {
    const nextMonthDate = new Date(year, month + 1, i)
      .toISOString()
      .split("T")[0];
    if (!uniqueDates.has(nextMonthDate)) {
      days.push({
        date: nextMonthDate,
        isCurrentMonth: false,
        isToday: false,
        isSelected: false,
        isDayOff: false,
        events: [],
      });
      uniqueDates.add(nextMonthDate);
    }
  }

  return days;
};

export default GetDaysInWeek;
