import { useEffect, useState } from "react";

interface UseDebounceParams<T> {
  value: T;
  delay: number;
}

export function useDebounce<T>({ value, delay }: UseDebounceParams<T>): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup the timeout on value or delay change
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}
