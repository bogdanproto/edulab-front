import debounce from 'lodash.debounce';
import { useCallback, useEffect, useState } from 'react';

export const useDebouncedSearch = <T>(
  value: T,
  delay: number
): [T, (newValue: T) => void] => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  const debouncedValueSetter = useCallback(
    debounce((newValue: T) => setDebouncedValue(newValue), delay),
    [delay]
  );

  useEffect(() => {
    debouncedValueSetter(value);
  }, [value, debouncedValueSetter]);

  return [debouncedValue, debouncedValueSetter];
};
