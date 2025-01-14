// TODO:data fetch

"use client";

import { useState } from "react";
import {
  addDays,
  addMonths,
  endOfMonth,
  endOfWeek,
  format,
  isSameDay,
  isSameMonth,
  startOfMonth,
  startOfWeek,
  subMonths,
} from "date-fns";
import { ChevronLeft, ChevronRight, Plus } from "lucide-react";

import { Button } from "./button";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "./dialog";
import { Input } from "./input";
import { Label } from "./label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "./select";

interface Event {
  id: string;
  title: string;
  date: Date;
}

type ViewType = "day" | "week" | "month";

export const EnhancedTaskCalendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date()); // State to track the currently selected date
  const [view, setView] = useState<ViewType>("month"); // State to track the current view (day, week, month)
  const [events, setEvents] = useState<Event[]>([]); // State to track the list of events
  const [newEvent, setNewEvent] = useState({ title: "", date: new Date() }); // State to track new event details
  const [isDialogOpen, setIsDialogOpen] = useState(false); // State to manage dialog visibility

  // Handles clicking on a specific date to set it for a new event
  const onDateClick = (day: Date) => {
    setNewEvent((prev) => ({ ...prev, date: day }));
    setIsDialogOpen(true); // Open the dialog for adding an event
  };

  // Changes the view type (day, week, month)
  const changeView = (newView: ViewType) => {
    setView(newView);
  };

  // Moves to the next date depending on the current view
  const nextDate = () => {
    setCurrentDate((prevDate) =>
      view === "day"
        ? addDays(prevDate, 1)
        : view === "week"
          ? addDays(prevDate, 7)
          : addMonths(prevDate, 1),
    );
  };

  // Moves to the previous date depending on the current view
  const prevDate = () => {
    setCurrentDate((prevDate) =>
      view === "day"
        ? addDays(prevDate, -1)
        : view === "week"
          ? addDays(prevDate, -7)
          : subMonths(prevDate, 1),
    );
  };

  // Adds a new event to the calendar
  const addEvent = () => {
    if (newEvent.title.trim() !== "") {
      setEvents([...events, { ...newEvent, id: Date.now().toString() }]); // Add the new event to the list
      setNewEvent({ title: "", date: new Date() }); // Reset the new event state
      setIsDialogOpen(false); // Close the dialog
    }
  };

  // Renders the calendar header with navigation buttons and the current date
  const renderHeader = () => {
    const dateFormat = view === "month" ? "MMMM yyyy" : "MMMM d, yyyy"; // Format changes based on view type
    return (
      <div className="mb-4 flex items-center justify-between">
        <Button variant="outline" size="icon" onClick={prevDate}>
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h2 className="text-xl font-bold">{format(currentDate, dateFormat)}</h2>
        <Button variant="outline" size="icon" onClick={nextDate}>
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>
    );
  };

  // Renders the days of the week (e.g., Mon, Tue, etc.)
  const renderDays = () => {
    const dateFormat = "EEE"; // Day format
    const days = [];
    const startDate = startOfWeek(currentDate); // Get the start of the current week
    for (let i = 0; i < 7; i++) {
      days.push(
        <div key={i} className="text-center font-bold">
          {format(addDays(startDate, i), dateFormat)}
        </div>,
      );
    }
    return <div className="mb-2 grid grid-cols-7 gap-2">{days}</div>;
  };

  // Renders the cells of the calendar for the current view (month, week, day)
  const renderCells = () => {
    const monthStart = startOfMonth(currentDate); // Start of the current month
    const monthEnd = endOfMonth(monthStart); // End of the current month
    const startDate = startOfWeek(monthStart); // Start of the week containing the start of the month
    const endDate = endOfWeek(monthEnd); // End of the week containing the end of the month

    const dateFormat = "d"; // Day format for rendering
    const rows = [];

    let days = [];
    let day = startDate;
    let formattedDate = "";

    // Loop to render each week in the current view
    while (day <= endDate) {
      for (let i = 0; i < 7; i++) {
        formattedDate = format(day, dateFormat);
        const cloneDay = day;
        days.push(
          <div
            key={day.toString()}
            className={`min-h-[80px] cursor-pointer border p-2 ${
              !isSameMonth(day, monthStart) // If the day is not in the current month, make it gray
                ? "text-gray-400"
                : isSameDay(day, new Date()) // Highlight today's date
                  ? "bg-blue-100"
                  : ""
            }`}
            onClick={() => onDateClick(cloneDay)} // Set the date for adding a new event
          >
            <span className="float-right">{formattedDate}</span>
            {events
              .filter((event) => isSameDay(event.date, day)) // Filter events that occur on this day
              .map((event) => (
                <div key={event.id} className="mt-1 truncate text-sm">
                  {event.title}
                </div>
              ))}
          </div>,
        );
        day = addDays(day, 1); // Move to the next day
      }
      rows.push(
        <div key={day.toString()} className="grid grid-cols-7 gap-2">
          {days}
        </div>,
      );
      days = []; // Reset days for the next week
    }
    return <div className="mb-4">{rows}</div>;
  };

  return (
    <Card className="mx-auto w-full max-w-4xl">
      <CardHeader>
        <CardTitle>Task Calendar</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="mb-4 flex items-center justify-between">
          {renderHeader()}
          {/* Dropdown to select the view type (day, week, month) */}
          <Select onValueChange={(value: ViewType) => changeView(value)}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Select view" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="day">Day</SelectItem>
              <SelectItem value="week">Week</SelectItem>
              <SelectItem value="month">Month</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {/* Render cells based on the current view */}
        {view === "month" && (
          <>
            {renderDays()}
            {renderCells()}
          </>
        )}
        {view === "week" && renderCells()}
        {view === "day" && renderCells()}
        {/* Dialog for adding a new event */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" /> Add Event
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Add New Event</DialogTitle>
              <DialogDescription>
                Create a new event for your calendar. Click save when you're
                done.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="title" className="text-right">
                  Title
                </Label>
                {/* Input for event title */}
                <Input
                  id="title"
                  value={newEvent.title}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, title: e.target.value })
                  }
                  className="col-span-3"
                />
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="date" className="text-right">
                  Date
                </Label>
                {/* Input for event date and time */}
                <Input
                  id="date"
                  type="datetime-local"
                  value={format(newEvent.date, "yyyy-MM-dd'T'HH:mm")}
                  onChange={(e) =>
                    setNewEvent({ ...newEvent, date: new Date(e.target.value) })
                  }
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              {/* Button to save the new event */}
              <Button type="submit" onClick={addEvent}>
                Save Event
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
};
