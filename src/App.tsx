import React from 'react';

import NoteList from 'components/NoteList';
import './styles.css';

export default function App() {
  return (
    <div className="App">
      <h1>Jottr</h1>
      <NoteList />
    </div>
  );
}
