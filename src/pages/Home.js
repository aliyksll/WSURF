import React from 'react';
import { Container, Typography, Box } from '@mui/material';

const Home = () => {
  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h2" component="h1" gutterBottom>
          Hoş Geldiniz!
        </Typography>
        <Typography variant="h5" component="h2" gutterBottom>
          Web sitemize hoş geldiniz
        </Typography>
        <Typography variant="body1" paragraph>
          Bu web sitesi, modern ve kullanıcı dostu bir yapıda oluşturulmuştur.
          Sayfalar arası kolay geçişler ve profesyonel bir görünüm sunmaktadır.
        </Typography>
      </Box>
    </Container>
  );
};

export default Home;
