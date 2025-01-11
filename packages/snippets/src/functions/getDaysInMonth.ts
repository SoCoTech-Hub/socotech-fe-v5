type Event = {
  start: string | Date; // Event start date as string or Date
  end: string | Date; // Event end date as string or Date
};

type Day = {
  date: string; // ISO formatted date (YYYY-MM-DD)
  isCurrentMonth: boolean; // Whether the day is part of the current month
  isToday: boolean; // Whether the day is today
  isSelected: boolean; // Whether the day is selected
  isDayOff: boolean; // Whether the day is a day off
  events: Event[]; // Events occurring on this day
};

const GetDaysInMonth = (
  year: number,
  month: number,
  events: Event[] = [],
): Day[] => {
  const days: Day[] = [];
  const uniqueDates = new Set<string>();
  const today = new Date().toISOString().split("T")[0];

  // Helper to format a date as YYYY-MM-DD
  const formatDate = (date: string | Date): string => {
    const d = new Date(date);
    return `${d.getFullYear()}-${(d.getMonth() + 1).toString().padStart(2, "0")}-${d
      .getDate()
      .toString()
      .padStart(2, "0")}`;
  };

  // Add a day's data to the array
  const addDay = (currentDate: string, isCurrentMonth: boolean): void => {
    if (uniqueDates.has(currentDate)) return;

    const dayEvents = events.filter((event) => {
      const startDate = formatDate(event.start);
      const endDate = formatDate(event.end);
      return currentDate >= startDate && currentDate <= endDate;
    });

    days.push({
      date: currentDate,
      isCurrentMonth,
      isToday: currentDate === today,
      isSelected: false,
      isDayOff: false,
      events: dayEvents,
    });

    uniqueDates.add(currentDate);
  };

  // Add days from the previous month to fill the first week
  const firstDayOfMonth = new Date(year, month, 1);
  const lastDayOfMonth = new Date(year, month + 1, 0);
  const firstWeekDay = firstDayOfMonth.getDay() || 7; // Sunday as the 7th day

  for (let i = 1; i < firstWeekDay; i++) {
    const prevMonthDate = new Date(year, month, -i + 1)
      .toISOString()
      .split("T")[0];
    addDay(prevMonthDate, false);
  }

  // Add all days of the current month
  for (let i = 1; i <= lastDayOfMonth.getDate(); i++) {
    const currentMonthDate = new Date(year, month, i)
      .toISOString()
      .split("T")[0];
    addDay(currentMonthDate, true);
  }

  // Add days from the next month to fill the last week
  const remainingSlots = (7 - (days.length % 7)) % 7; // Ensure no extra days if the grid is complete
  for (let i = 1; i <= remainingSlots; i++) {
    const nextMonthDate = new Date(year, month + 1, i)
      .toISOString()
      .split("T")[0];
    addDay(nextMonthDate, false);
  }

  return days;
};

export default GetDaysInMonth;
