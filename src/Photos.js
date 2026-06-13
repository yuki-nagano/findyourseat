import React from 'react';
import { Container, Box, Button, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faHeart, faImages } from '@fortawesome/free-solid-svg-icons';
import './common.css';

function Photos() {
  const location = useLocation();
  const isDemo = location.pathname.includes('demo');

  const WEDDING_SHARE_URL = 'https://www.weddingshare.me/weddings/yf8pqby0bv1sbvrz/nhPkzXLmj2wqgOQ1kohV40YCX9NnA8MM?openExternalBrowser=1&type=link';

  const handleUpload = () => {
    const photoUrl = isDemo
      ? process.env.REACT_APP_GOOGLE_PHOTOS_URL_DEMO
      : WEDDING_SHARE_URL;
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
        sx={{ gap: 2.5, px: 3, pb: 8 }}
      >
        <Box sx={{ color: 'var(--primary-green)', fontSize: '3.5rem' }}>
          <FontAwesomeIcon icon={faCamera} />
        </Box>

        <Typography
          className="common_style"
          sx={{ fontFamily: 'Poppins', fontSize: '1.6rem', fontWeight: 500 }}
        >
          Photos & Videos
        </Typography>

        <Box sx={{ display: 'flex', gap: 1.5, color: '#e91e8c' }}>
          <FontAwesomeIcon icon={faHeart} />
          <FontAwesomeIcon icon={faHeart} style={{ opacity: 0.4 }} />
          <FontAwesomeIcon icon={faHeart} />
        </Box>

        <Typography
          className="common_style"
          sx={{
            fontFamily: 'Poppins',
            color: '#666',
            fontSize: '0.95rem',
            lineHeight: 2,
            maxWidth: 320,
          }}
        >
          Capture and share the beautiful moments from today!
          <br />
          Your memories are a gift to us.
        </Typography>

        <Button
          variant="contained"
          onClick={handleUpload}
          startIcon={<FontAwesomeIcon icon={faImages} />}
          sx={{
            mt: 1,
            backgroundColor: 'var(--primary-green)',
            fontFamily: 'Poppins',
            fontSize: '1rem',
            px: 4,
            py: 1.5,
            borderRadius: 3,
            textTransform: 'none',
            boxShadow: '0 4px 12px rgba(76, 175, 80, 0.35)',
            '&:hover': {
              backgroundColor: 'var(--primary-green)',
              opacity: 0.85,
              boxShadow: '0 6px 16px rgba(76, 175, 80, 0.45)',
            },
          }}
        >
          Share Photos & Videos
        </Button>
      </Box>
    </Container>
  );
}

export default Photos;
