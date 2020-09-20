import React, { useReducer, useEffect, useCallback } from 'react';

import { useStoredState } from 'hooks';
import { move } from 'utils';
import LocalStorage from 'Storage';
import Note from './Note';

const EMPTY_NOTE_DATA = {
  title: '',
  text: '',
};

const storage = new LocalStorage('jottr');

interface NoteState {
  [key: number]: {
    // TODO: make this reusable
    title: string;
    text: string;
  };
}

type NoteAction =
  | {
      type: 'change';
      key: number;
      parameter: string;
      value: string;
    }
  | {
      type: 'delete';
      key: number;
    }
  | {
      type: 'delete_sync';
      key: number;
    }
  | {
      type: 'change_sync';
      key: number;
      newValue: {
        title: string;
        text: string;
      };
    };

function reducer(state: NoteState, action: NoteAction) {
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
    case 'change_sync':
      return {
        ...state,
        [action.key]: action.newValue,
      };
    case 'delete':
      storage.removeItem(action.key);
    // fall through
    case 'delete_sync':
      const { [action.key]: _deleted, ...rest } = state;
      return rest;
  }
}

function getInitialState(keys: number[]): NoteState {
  console.log('gis', keys);
  const state: NoteState = {};
  keys.forEach((key) => {
    state[key] = storage.getItem<number>(key);
  });
  return state;
}

export default function NoteList() {
  const [keys, setKeys] = useStoredState<number[]>(storage, 'keys', []);
  const [nextKey, setNextKey] = useStoredState(storage, 'nextKey', 0);
  const [state, dispatch] = useReducer(reducer, keys, getInitialState);

  useEffect(() => {
    storage.setItem('version', 1); // will be helpful if the API ever changes
  }, []);

  const storageCallback = useCallback(
    (event: StorageEvent) => {
      console.log(event);
      if (event.newValue === event.oldValue) {
        // No change
        return;
      }
      if (event.key == null) {
        // TODO: handle clearing storage
        return;
      }

      const key = storage.removeNamespace(event.key);
      const keyNumber = Number(key);
      if (key === 'keys' && event.newValue) {
        setKeys(JSON.parse(event.newValue));
      } else if (key === 'nextKey' && event.newValue) {
        setNextKey(JSON.parse(event.newValue));
      } else if (!isNaN(keyNumber)) {
        if (event.newValue === null) {
          dispatch({
            type: 'delete_sync',
            key: keyNumber,
          });
        } else {
          if (event.oldValue === null) {
            setNextKey(nextKey + 1);
          }
          dispatch({
            type: 'change_sync',
            key: keyNumber,
            newValue: JSON.parse(event.newValue),
          });
        }
      }
    },
    [setKeys, setNextKey, nextKey]
  );

  useEffect(() => {
    window.addEventListener('storage', storageCallback);

    return () => window.removeEventListener('storage', storageCallback);
  }, [storageCallback]);

  const makeOnMove = (index: number) => (direction: number) => {
    setKeys(move(keys, index, index + direction));
  };

  return (
    <>
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
