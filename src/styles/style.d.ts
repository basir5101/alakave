// styles/styled.d.ts
import 'styled-components';

declare module 'styled-components' {
  export interface DefaultTheme {
    colors: {
      primary: string;
      background: string;
      text: string;
      // Add more color properties as needed
    };
    fonts: {
      body: string;
      heading: string;
      // Add more font properties as needed
    };
    fontSizes: {
      small: string;
      medium: string;
      large: string;
      // Add more size properties as needed
    };
    // Add more theme properties as needed
  }
}
