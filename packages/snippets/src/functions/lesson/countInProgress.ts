const countInProgress = (elements: { isComplete: boolean }[]): number => {
  return elements.reduce((count, element) => {
    return count + (element.isComplete ? 0 : 1);
  }, 0);
};

export default countInProgress;
