import React from "react";
import { AppBar, Container, Typography, Toolbar } from "@mui/material";

const Footer = () => {
  return (
    <AppBar position="fixed" color="primary" sx={{ top: "auto", bottom: 0 }}>
      <Toolbar sx={{ justifyContent: "center" }}>
        <Container maxWidth="md">
          <Typography
            variant="h6"
            color="textPrimary"
            align="center"
            sx={{ color: "white" }}
          >
            &copy; 2023 - CryptoHub
          </Typography>
        </Container>
      </Toolbar>
    </AppBar>
  );
};

export default Footer;
