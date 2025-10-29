import React from 'react';
import { Container, Box, Button } from '@mui/material';
import './common.css';

function Photos() {
  const handleUpload = () => {
    window.open('https://photos.app.goo.gl/XTfz5K7CtLq1mBut7', '_blank');
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        sx={{ gap: 3 }}
      >
        <h4 className="common_style">
          Share your photos and videos that you took today
        </h4>
        <Button
          variant="contained"
          onClick={handleUpload}
          sx={{
            backgroundColor: 'var(--primary-green)',
            fontFamily: 'Poppins',
            '&:hover': {
              backgroundColor: 'var(--primary-green)',
              opacity: 0.8
            }
          }}
        >
          Upload to Google Photos
        </Button>
      </Box>
    </Container>
  );
}

export default Photos;