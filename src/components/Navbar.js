import React from 'react';
import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Logo
        </Typography>
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
          <Button
            color="inherit"
            component={RouterLink}
            to="/"
          >
            Ana Sayfa
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/about"
          >
            Hakkımızda
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/contact"
          >
            İletişim
          </Button>
          <Button
            color="inherit"
            component={RouterLink}
            to="/decision"
          >
            Karar Ver
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
