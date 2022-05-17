import React, { useEffect, useState } from "react";

const PREFIX = "react-chat";

export default function useLocalStorage(key, initialValue) {
  const prefixedKey = PREFIX + key;

  const [value, setValue] = useState(() => {
    const jsonVal = localStorage.getItem(prefixedKey);
    if (jsonVal != null) return JSON.parse(jsonVal);
    if (typeof initialValue === "function") {
      return initialValue();
    } else {
      return initialValue;
    }
  });

  useEffect(() => {
    localStorage.getItem(prefixedKey, JSON.stringify(value))
  }, [prefixedKey, value])

  return [value, setValue]
}
