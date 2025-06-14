import { Button, ThemeProvider, createTheme, CssBaseline } from '@mui/material';
import { useState } from 'react';
import Home from './pages/Home';
import { PDFProvider } from './context/PDFContext';

export default function App() {
  const [darkMode, setDarkMode] = useState(false);
  const theme = createTheme({
    palette: {
      mode: darkMode ? 'dark' : 'light',
    },
  });

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <PDFProvider>
        <Home />
        <Button 
          onClick={() => setDarkMode(!darkMode)} 
          sx={{ position: 'fixed', bottom: 16, right: 16 }}
        >
          Toggle Dark Mode
        </Button>
      </PDFProvider>
    </ThemeProvider>
  );
}