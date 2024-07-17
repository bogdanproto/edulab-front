import { useState, useEffect } from 'react';

export function useLocalStorage(key: string, initialValue: number | string) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = window.localStorage.getItem(key);
      if (item) {
        const parsedItem = JSON.parse(item);

        return typeof parsedItem === 'number'
          ? parsedItem
          : parsedItem.toString();
      } else {
        return initialValue;
      }
    } catch (error) {
      return initialValue;
    }
  });

  useEffect(() => {
    window.localStorage.setItem(key, JSON.stringify(storedValue));
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}
