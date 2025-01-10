export const getShortMonth = ({ fullDate }: { fullDate: string | Date }): string => {
  const theDate = new Date(fullDate);

  if (isNaN(theDate.getTime())) {
    throw new Error("Invalid date provided.");
  }

  const monthRange = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
  ];

  return monthRange[theDate.getMonth()];
};
