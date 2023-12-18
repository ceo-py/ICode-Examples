import { useEffect, useState } from "react";

export function LanguageLocalStorage() {
  const key = "Icode-Example-Index-Select";
  const [value, setValue] = useState(() => {
    const localValue = localStorage.getItem(key);
    return localValue ? JSON.parse(localValue) : "python";
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}
