import React from 'react';
import { ThemeProvider } from 'styled-components';

import NoteList from 'components/NoteList';
import Header from 'components/Header';
import theme from 'styles/theme';
import GlobalStyles from 'styles/GlobalStyles';

export default function App() {
  return (
    <ThemeProvider theme={theme}>
      <>
        <GlobalStyles />
        <Header />
        <NoteList />
      </>
    </ThemeProvider>
  );
}
