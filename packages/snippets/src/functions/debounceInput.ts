/* eslint-disable @typescript-eslint/no-explicit-any */
// Utility for debouncing: Prevents excessive re-rendering by debouncing the input.
export function DebounceInput(func: (...args: any[]) => void, wait: number) {
  let timeout: NodeJS.Timeout;
  return function executedFunction(...args: any[]) {
    const later = () => {
      clearTimeout(timeout);
      // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}
