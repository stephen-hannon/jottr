import React, { useReducer, useEffect } from 'react';
import { useStoredState } from './hooks';
import { move } from './utils';
import LocalStorage from './Storage';
import Note from './Note';

const EMPTY_NOTE_DATA = {
  title: '',
  text: '',
};

const storage = new LocalStorage('jottr');
console.log(storage);

function reducer(state, action) {
  switch (action.type) {
    case 'change':
      const newData = {
        ...EMPTY_NOTE_DATA,
        ...state[action.key],
        [action.parameter]: action.value,
      };
      storage.setItem(action.key, newData);
      return {
        ...state,
        [action.key]: newData,
      };
    case 'delete':
      storage.removeItem(action.key);
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
    state[key] = storage.getItem(key);
  });
  return state;
}

export default function NoteList() {
  const [keys, setKeys] = useStoredState(storage, 'keys', []);
  const [nextKey, setNextKey] = useStoredState(storage, 'nextKey', 0);
  const [state, dispatch] = useReducer(reducer, keys, getInitialState);

  useEffect(() => {
    storage.setItem('version', 1); // will be helpful if the API ever changes
  }, []);

  const makeOnMove = (index) => (direction) => {
    setKeys(move(keys, index, index + direction));
  };

  return (
    <>
      <p>{JSON.stringify(state)}</p>
      {[nextKey, ...keys].map((key, index) => (
        <Note
          key={key}
          data={state[key] || EMPTY_NOTE_DATA}
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
    </>
  );
}
