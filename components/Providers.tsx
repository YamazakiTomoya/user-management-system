'use client';

import React, { useMemo, useState } from 'react';
import { ThemeProvider, CssBaseline, createTheme } from '@mui/material';
// import theme from '../styles/theme';
import Navbar from './Navbar';

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [darkMode, setDarkMode] = useState(false);

  const theme = useMemo(
    () =>
      createTheme({
        palette: {
          mode: darkMode ? 'dark' : 'light',
          background: {
            default: darkMode ? "#121212" : "#f5f5f5",
            paper: darkMode ? "#1e1e1e" : "#fff",
          },
          text: {
            primary: darkMode ? "#fff" : "#111",
            secondary: darkMode ? "#ccc" : "#555",
          },
        },
      }),
    [darkMode],
  );

  const handleThemeChange = () => {
    setDarkMode((prev) => !prev);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Navbar onThemeChange={handleThemeChange} darkMode={darkMode} />
      <div style={{ minHeight: "100vh", background: theme.palette.background.default, color: theme.palette.text.primary }}>
        {children}
      </div>
    </ThemeProvider>
  );
};

export default Providers;