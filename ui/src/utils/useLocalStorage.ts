import * as React from "react";

function useLocalStorageState<T>(
  key: string,
  defaultValue: T, //< Boolean | Number | Object | Function | String >,
  { serialize = JSON.stringify, deserialize = JSON.parse } = {}
) {
  // Pass initial state function to useState so logic is only executed once
  const [state, setState] = React.useState<T>(() => {
    if (typeof window === "undefined") {
      return defaultValue;
    }
    const valueInLocalStorage = window.localStorage.getItem(key);
    if (valueInLocalStorage) {
      return deserialize(valueInLocalStorage);
    }
    return typeof defaultValue === "function" ? defaultValue() : defaultValue;
  });

  const prevKeyRef = React.useRef(key);

  React.useEffect(() => {
    const prevKey = prevKeyRef.current;
    if (prevKey !== key) {
      window.localStorage.removeItem(prevKey);
    }
    prevKeyRef.current = key;
    window.localStorage.setItem(key, serialize(state));
  }, [key, state, serialize]);

  // Return a wrapped version of useState's setter function that ...
  // ... persists the new value to localStorage.
  const setValue = (value: T | ((val: T) => T)) => {
    try {
      // Allow value to be a function so we have same API as useState
      const valueToStore = value instanceof Function ? value(state) : value;
      // Save state
      setState(valueToStore);
      // Save to local storage
      if (typeof window !== "undefined") {
        window.localStorage.setItem(key, serialize(valueToStore));
      }
    } catch (error) {
      // A more advanced implementation would handle the error case
      console.log(error);
    }
  };
  return [state, setValue];
}

export { useLocalStorageState };
