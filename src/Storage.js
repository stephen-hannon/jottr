// import { useEffect, useState } from 'react';

export default class LocalStorage {
  constructor(namespace) {
    this.namespace = namespace;
    this.storage = window.localStorage;
  }

  getNamespacedKey(key) {
    return this.namespace ? `${this.namespace}_${key}` : key;
  }

  getItem(key, defaultValue) {
    const value = this.storage.getItem(this.getNamespacedKey(key));
    return value === null && defaultValue !== undefined
      ? defaultValue
      : JSON.parse(value);
  }

  removeItem(key) {
    this.storage.removeItem(this.getNamespacedKey(key));
  }

  setItem(key, value) {
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
