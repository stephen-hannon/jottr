import { useEffect, useState, Dispatch, SetStateAction } from 'react';
import LocalStorage from './Storage';

export function useStoredState<T>(storage: LocalStorage, key: string, defaultValue: T): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    return storage.getItem(key, defaultValue);
  });

  useEffect(() => {
    storage.setItem(key, value);
  }, [storage, key, value]);

  return [value, setValue];
}
