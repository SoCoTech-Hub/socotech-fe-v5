export const convertDateToDaysHoursMinSec = (
  countDown: string,
): {
  days: number;
  hours: number;
  minutes: number;
  seconds: number;
} => {
  const targetDate = new Date(countDown).getTime();
  const now = Date.now();

  if (isNaN(targetDate)) {
    throw new Error("Invalid date string provided.");
  }

  const timeDifference = targetDate - now;

  const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
  const hours = Math.floor(
    (timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60));
  const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000);

  return { days, hours, minutes, seconds };
};
