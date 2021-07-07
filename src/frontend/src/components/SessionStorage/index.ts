import { Dispatch, SetStateAction, useEffect, useState } from "react";

export function useSessionState<T>({
  key,
  defaultValue,
}: {
  key: string;
  defaultValue?: T;
}): [T, Dispatch<SetStateAction<T>>] {
  const [state, setState] = useState<T>(() => {
    const storedVal = sessionStorage.getItem(key);
    if (storedVal !== null) {
      return JSON.parse(storedVal);
    } else {
      return defaultValue;
    }
  });

  useEffect(() => {
    setState(() => {
      const storedVal = sessionStorage.getItem(key);
      if (storedVal !== null) {
        return JSON.parse(storedVal);
      } else {
        return defaultValue;
      }
    });
  }, [key, defaultValue]);

  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(state));
  }, [key, state]);

  return [state, setState];
}
