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
        sx={{ minHeight: 'calc(100vh - 56px)', justifyContent: 'center', px: 4 }}
      >
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1.2,
          py: 3,
          px: 3,
          borderRadius: 4,
          width: '100%',
          maxWidth: 340,
        }}>
          <Box sx={{ color: 'var(--primary-green)', fontSize: '2.8rem' }}>
            <FontAwesomeIcon icon={faCamera} />
          </Box>

          <Typography
            className="common_style"
            sx={{ fontFamily: 'Poppins', fontSize: '1.4rem', fontWeight: 500 }}
          >
            Photos & Videos
          </Typography>

          <Box sx={{ display: 'flex', gap: 1.2, color: '#f48fb1' }}>
            <FontAwesomeIcon icon={faHeart} />
            <FontAwesomeIcon icon={faHeart} style={{ opacity: 0.5 }} />
            <FontAwesomeIcon icon={faHeart} />
          </Box>

          <Typography
            className="common_style"
            sx={{
              fontFamily: 'Poppins',
              color: '#666',
              fontSize: '0.88rem',
              lineHeight: 1.8,
              maxWidth: 280,
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
              mt: 0.5,
              backgroundColor: 'var(--primary-green)',
              fontFamily: 'Poppins',
              fontSize: '0.875rem',
              px: 3,
              py: 1,
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
      </Box>
    </Container>
  );
}

export default Photos;
