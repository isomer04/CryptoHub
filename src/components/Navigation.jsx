import React, { useState } from "react";
import {
  AppBar,
  Box,
  Container,
  IconButton,
  Toolbar,
  Typography,
  Menu,
  MenuItem,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link } from "react-router-dom";

function Navigation() {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <AppBar position="fixed">
      <Container maxWidth="xl">
        <Toolbar>
          <Typography
            variant="h6"
            component={Link}
            to="/"
            style={{
              flexGrow: 1,
              textDecoration: "none",
              color: "white",
            }}
          >
            CryptoHub
          </Typography>

          <Box
            sx={{
              display: { xs: "none", md: "flex" },
              marginRight: "15px",
            }}
          >
            <Link
              to="/"
              style={{ textDecoration: "none", color: "white", marginRight: "15px" }}
            >
              Home
            </Link>
            <Link
              to="/cryptotracker"
              style={{ textDecoration: "none", color: "white", marginRight: "15px" }}
            >
              Crypto Tracker
            </Link>
            <Link
              to="/cryptonews"
              style={{ textDecoration: "none", color: "white", marginRight: "15px" }}
            >
              Crypto News
            </Link>
            <Link
              to="/create"
              style={{ textDecoration: "none", color: "white", marginRight: "15px" }}
            >
              Create a Post
            </Link>
            <Link
              to="/about"
              style={{ textDecoration: "none", color: "white", marginRight: "15px" }}
            >
              About
            </Link>
            <Link
              to="/contact"
              style={{ textDecoration: "none", color: "white" }}
            >
              Contact
            </Link>
          </Box>

          <Box sx={{ display: { xs: "block", md: "none" } }}>
            <IconButton
              color="inherit"
              aria-label="menu"
              onClick={handleMenuOpen}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem
                component={Link}
                to="/"
                onClick={handleMenuClose}
              >
                Home
              </MenuItem>
              <MenuItem
                component={Link}
                to="/cryptotracker"
                onClick={handleMenuClose}
              >
                Crypto Tracker
              </MenuItem>
              <MenuItem
                component={Link}
                to="/cryptonews"
                onClick={handleMenuClose}
              >
                Crypto News
              </MenuItem>
              <MenuItem
                component={Link}
                to="/create"
                onClick={handleMenuClose}
              >
                Create a Post
              </MenuItem>
              <MenuItem
                component={Link}
                to="/about"
                onClick={handleMenuClose}
              >
                About
              </MenuItem>
              <MenuItem
                component={Link}
                to="/contact"
                onClick={handleMenuClose}
              >
                Contact
              </MenuItem>
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navigation;
