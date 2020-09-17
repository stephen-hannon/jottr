import React from 'react';
import { ThemeProvider, DefaultTheme } from 'styled-components';

import NoteList from 'components/NoteList';
import './styles.css';

const THEME: DefaultTheme = {
  colors: {
    primary: '#ab47bc',
    text: '#000',
  }
};

export default function App() {
  return (
    <ThemeProvider theme={THEME}>
      <>
        <h1>Jottr</h1>
        <NoteList />
      </>
    </ThemeProvider>
  );
}
