import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
* {
  box-sizing: border-box;
}

html {
  /* Make 1rem == 10px on typical browsers */
  font-size: ${(10 / 16) * 100}%;
  font-family: 'Source Sans Pro', sans-serif;
}

body {
  font-size: 1.6rem;
  margin: 0;
}

input,
button {
  font-family: inherit;
}
`;

export default GlobalStyles;
