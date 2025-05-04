import React from 'react';
import { Container, Typography, Box, TextField, Button } from '@mui/material';

const Contact = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          İletişim
        </Typography>
        <Box component="form" sx={{ mt: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="name"
            label="Adınız"
            name="name"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label="E-posta"
            name="email"
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="message"
            label="Mesaj"
            name="message"
            multiline
            rows={4}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
          >
            Gönder
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Contact;
