import React, { useReducer, useState, useEffect } from 'react';
import './styles.css';
import Note from './Note';

function reducer(state, action) {
  switch (action.type) {
    case 'change':
      const newData = {
        title: '',
        text: '',
        ...state[action.key],
        [action.parameter]: action.value,
      };
      localStorage.setItem(action.key, JSON.stringify(newData));
      return {
        ...state,
        [action.key]: newData,
      };
    case 'delete':
      localStorage.removeItem(action.key);
      const { [action.key]: _deleted, ...rest } = state;
      return rest;
    default:
      throw new Error(`Unexpected action type ${action.type}`);
  }
}

function getInitialState(keys) {
  console.log('gis', keys);
  const state = {};
  keys.forEach((key) => {
    const storedValue = localStorage.getItem(key);
    console.log(storedValue);
    state[key] = JSON.parse(storedValue);
  });
  return state;
}

function useStoredState(key, defaultValue) {
  const [value, setValue] = useState(() => {
    const storedValue = localStorage.getItem(key);

    return storedValue === null ? defaultValue : JSON.parse(storedValue);
  });

  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(value));
  }, [key, value]);

  return [value, setValue];
}

function move(arr, fromInd, toInd) {
  if (toInd < 0 || toInd >= arr.length) return arr;

  const newArr = [...arr];
  const value = newArr.splice(fromInd, 1)[0];
  newArr.splice(toInd, 0, value);
  return newArr;
}

export default function App() {
  useStoredState('version', 1); // will be helpful if the API ever changes
  const [keys, setKeys] = useStoredState('keys', []);
  const [nextKey, setNextKey] = useStoredState('nextKey', 0);
  const [state, dispatch] = useReducer(reducer, keys, getInitialState);

  const makeOnMove = (index) => (direction) => {
    setKeys(move(keys, index, index + direction));
  };

  return (
    <div className="App">
      <h1>Jottr</h1>
      <p>{JSON.stringify(state)}</p>
      {[nextKey, ...keys].map((key, index) => (
        <Note
          key={key}
          data={state[key] || {}}
          moveUpDisabled={index <= 1}
          moveDownDisabled={index === 0 || index === keys.length}
          deleteDisabled={index === 0}
          onMove={makeOnMove(index - 1)}
          onChange={(parameter, value) => {
            if (index === 0) {
              setKeys([nextKey, ...keys]);
              setNextKey(nextKey + 1);
            }
            dispatch({ type: 'change', key, value, parameter });
          }}
          onDelete={() => {
            setKeys(keys.filter((k) => k !== key));
            dispatch({ type: 'delete', key });
          }}
        />
      ))}
    </div>
  );
}
