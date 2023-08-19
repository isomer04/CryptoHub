import React from 'react';
import { Typography, Container } from '@mui/material';

const Footer = () => {
  return (
    <footer className="footer" style={{
      position: 'fixed',
      bottom: 0,
      left: 0,
      width: '100%',
      justifyContent: 'center',
      textAlign: 'center',
    }}>
      <Container maxWidth="md">
        <Typography variant="body2" color="textSecondary" align="center">
          &copy; 2023 - CryptoHub
        </Typography>
      </Container>
    </footer>
  );
}

export default Footer;
