export function convertUTCToLocal(
  utcDate: string,
  options?: Intl.DateTimeFormatOptions,
  locale: string = "default",
): string {
  try {
    // Parse the UTC date string into a Date object
    const date = new Date(utcDate);

    // Check if the input date is valid
    if (isNaN(date.getTime())) {
      throw new Error(
        "Invalid date format. Please provide a valid UTC date string.",
      );
    }

    // Use the Intl.DateTimeFormat API to format the local date and time
    const formatter = new Intl.DateTimeFormat(locale, {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
      timeZoneName: "short",
      ...options,
    });

    return formatter.format(date);
  } catch (error) {
    console.error("Error converting UTC to local date:", error);
    return "Invalid Date";
  }
}

// Example usage:
// const utcDate = "2024-12-22T14:30:00Z";
// const localDate = convertUTCToLocal(utcDate);
// console.log(localDate);
