import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const About = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Hakkımızda
        </Typography>
        <Typography variant="body1" paragraph>
          Bu bölümde şirketimiz veya projemiz hakkında detaylı bilgi verilebilir.
        </Typography>
      </Box>
    </Container>
  );
};

export default About;
