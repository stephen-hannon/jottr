// import { useEffect, useState } from 'react';

type KeyType = string | number;

export default class LocalStorage {
  private namespace?: string;
  private storage: Storage;

  constructor(namespace?: string) {
    this.namespace = namespace;
    this.storage = window.localStorage;
  }

  getNamespacedKey(key: KeyType): string {
    return this.namespace ? `${this.namespace}_${key}` : key.toString();
  }

  removeNamespace(namespacedKey: string): string {
    if (!this.namespace || !namespacedKey.startsWith(`${this.namespace}_`)) {
      return namespacedKey;
    }
    return namespacedKey.replace(`${this.namespace}_`, '');
  }

  getItem<T>(key: KeyType, defaultValue?: T) {
    const value = this.storage.getItem(this.getNamespacedKey(key));
    return value === null && defaultValue !== undefined
      ? defaultValue
      : JSON.parse(value as string);
  }

  removeItem(key: KeyType) {
    this.storage.removeItem(this.getNamespacedKey(key));
  }

  setItem(key: KeyType, value: unknown) {
    const stringifiedValue = JSON.stringify(value);
    this.storage.setItem(this.getNamespacedKey(key), stringifiedValue);
  }

  // useStoredState(key, defaultValue) {
  //   const [value, setValue] = useState(() => {
  //     return this.getItem(key, defaultValue);
  //   });

  //   useEffect(() => {
  //     this.setItem(key, value);
  //   }, [key, value]);

  //   return [value, setValue];
  // }
}
