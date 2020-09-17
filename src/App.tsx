import React from 'react';
import { ThemeProvider, DefaultTheme } from 'styled-components';

import NoteList from 'components/NoteList';
import Header from 'components/Header';
import './styles.css';

const THEME: DefaultTheme = {
  colors: {
    gray: '#e0e0e0',
    primary: '#ab47bc',
    primaryLight: '#df78ef',
    text: '#000',
  },
  duration: 0.1,
};

export default function App() {
  return (
    <ThemeProvider theme={THEME}>
      <>
        <Header />
        <NoteList />
      </>
    </ThemeProvider>
  );
}
