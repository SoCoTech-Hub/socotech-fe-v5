export default function getReadableDate(fullDate: string | Date): string {
  const dateObj = new Date(fullDate);

  if (isNaN(dateObj.getTime())) {
    throw new Error("Invalid date provided.");
  }

  const dayOfWeek = dateObj.toLocaleDateString("en-US", { weekday: "short" });
  const day = dateObj.getDate().toString().padStart(2, "0");
  const month = dateObj.toLocaleDateString("en-US", { month: "short" });
  const hours = dateObj.getHours().toString().padStart(2, "0");
  const minutes = dateObj.getMinutes().toString().padStart(2, "0");

  return `${dayOfWeek}, ${day} ${month} ${hours}:${minutes}`;
}
