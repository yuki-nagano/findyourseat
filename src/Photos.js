import React from 'react';
import { Container, Box, Button } from '@mui/material';
import { useLocation } from 'react-router-dom';
import './common.css';

function Photos() {
  const location = useLocation();
  const isDemo = location.pathname.startsWith('/demo');
  
  const handleUpload = () => {
    const photoUrl = isDemo 
      ? process.env.REACT_APP_GOOGLE_PHOTOS_URL_DEMO 
      : process.env.REACT_APP_GOOGLE_PHOTOS_URL;
    if (photoUrl) {
      window.open(photoUrl, '_blank');
    }
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