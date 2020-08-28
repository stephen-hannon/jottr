import React, { useReducer, useState, useEffect } from 'react';
import './styles.css';
import Note from './Note';

function reducer(state, action) {
  switch (action.type) {
    case 'change':
      localStorage.setItem(action.key, JSON.stringify(action.value));
      return {
        ...state,
        [action.key]: action.value,
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
    state[key] = storedValue ? JSON.parse(storedValue) : `value ${key}`;
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
  const [keys, setKeys] = useStoredState('keys', [0]);
  const [nextKey, setNextKey] = useStoredState('nextKey', 1);
  const [state, dispatch] = useReducer(reducer, keys, getInitialState);

  const makeOnMove = (index) => (direction) => {
    setKeys(move(keys, index, index + direction));
  };

  return (
    <div className="App">
      <h1>Type here</h1>
      <button
        onClick={() => {
          setKeys([nextKey, ...keys]);
          dispatch({ type: 'change', key: nextKey, value: `Input ${nextKey}` });
          setNextKey(nextKey + 1);
        }}>
        add
      </button>
      <p>{JSON.stringify(state)}</p>
      {/* <Note
        title=""
        moveUpDisabled
        moveDownDisabled
        deleteDisabled
        onChange={value => {
          setKeys([nextKey, ...keys]);
          dispatch({ type: 'change', key: nextKey, value });
          setNextKey(nextKey + 1);
        }}
      /> */}
      {[nextKey, ...keys].map((key, index) => (
        <Note
          key={key}
          title={state[key] || ''}
          moveUpDisabled={index <= 1}
          moveDownDisabled={index === 0 || index === keys.length}
          deleteDisabled={index === 0}
          onMove={makeOnMove(index - 1)}
          onChange={(value) => {
            if (index === 0) {
              setKeys([nextKey, ...keys]);
              setNextKey(nextKey + 1);
            }
            dispatch({ type: 'change', key, value });
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
