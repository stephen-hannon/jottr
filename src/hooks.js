import { useEffect, useState } from 'react';

export function useStoredState(storage, key, defaultValue) {
  const [value, setValue] = useState(() => {
    return storage.getItem(key, defaultValue);
  });

  useEffect(() => {
    storage.setItem(key, value);
  }, [storage, key, value]);

  return [value, setValue];
}
