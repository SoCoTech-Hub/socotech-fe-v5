interface TimeElement {
  time: string | number;
}

const sumTimeSpent = (elements: TimeElement[]): number => {
  if (!Array.isArray(elements) || elements.length === 0) return 0;

  return elements.reduce((total, element) => {
    const time = parseInt(element.time as string, 10) || 0;
    return total + time;
  }, 0);
};

export default sumTimeSpent;
