import { useState } from "react";

/**
 * Custom localStorage hook
 */

function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);

      if (item === null) return initialValue;

      try {
        return JSON.parse(item);
      } catch (err) {
        // If the stored value is not valid JSON (e.g. 'undefined'), fall back
        // to the provided initial value instead of throwing.
        console.warn("useLocalStorage: failed to parse stored value, using initialValue", err);
        return initialValue;
      }
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  function setValue(value) {
    try {
      const valueToStore =
        typeof value === "function" ? value(storedValue) : value;

      setStoredValue(valueToStore);

      localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  }

  return [storedValue, setValue];
}

export default useLocalStorage;