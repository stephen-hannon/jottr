import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      gray: string;
      primary: string;
      primaryLight: string;
      text: string;
    };
    duration: number;
  }
}
