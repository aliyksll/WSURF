import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import Button from '@mui/material/Button';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import About from './pages/About';
import Contact from './pages/Contact';
import DecisionMaker from './pages/DecisionMaker';

const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Router>
        <Navbar>
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
        </Navbar>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/decision" element={<DecisionMaker />} />
        </Routes>
      </Router>
    </ThemeProvider>
  );
}

export default App;
