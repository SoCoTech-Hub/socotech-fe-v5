const countIsComplete = (elements: { isComplete: boolean }[]): number => {
  return elements.reduce((count, element) => {
    return count + (element.isComplete ? 1 : 0);
  }, 0);
};

export default countIsComplete;
