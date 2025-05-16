import React from 'react';
import { Container } from '@mui/material';
import Providers from '../components/Providers';
// import Navbar from '../components/Navbar';
import '../styles/globals.css';

const RootLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <html lang="ja">
      <body>
        <Providers>
          <Container sx={{ mt: 4 }}>
            {children}
          </Container>
        </Providers>
      </body>
    </html>
  );
}

export default RootLayout;