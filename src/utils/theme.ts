// theme.ts

export interface Theme {
    fonts: {
      primary: string;
      secondary: string;
    };
    fontSizes: {
      small: string;
      medium: string;
      large: string;
    };
    colors: {
      primary: string;
      secondary: string;
      background: string;
      text: string;
    };
  }
  
  const theme: Theme = {
    fonts: {
      primary: 'Arial, sans-serif',
      secondary: 'Helvetica, sans-serif',
    },
    fontSizes: {
      small: '12px',
      medium: '16px',
      large: '24px',
    },
    colors: {
      primary: '#007bff',
      secondary: '#6c757d',
      background: '#f8f9fa',
      text: '#333333',
    },
  };
  
  export default theme;