const getTimeFormat = (minutes: number): string => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;

  const formattedHours = hours < 10 ? `0${hours}` : hours.toString();
  const formattedMinutes = mins < 10 ? `0${mins}` : mins.toString();

  return `${formattedHours} h ${formattedMinutes} min`;
};

export default getTimeFormat;
