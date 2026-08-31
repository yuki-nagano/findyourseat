import React from 'react';
import { Container, Box, Button, Typography } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faHeart, faImages } from '@fortawesome/free-solid-svg-icons';
import { BABY_REVEAL_DATE } from './config';
import './common.css';

const REVEAL_PHOTO_URL = 'https://lh3.googleusercontent.com/d/1nzCGYn0r5TUeYlORisuLD3XCeKqdUcc8';
const PRE_REVEAL_PHOTO_URL = 'https://lh3.googleusercontent.com/d/1F4_0N6caTMO4ivhIycYB8hVDfUoEUafe';

function Photos() {
  const location = useLocation();
  const isDemo = location.pathname.includes('demo');
  const isReady = !isDemo && new Date() >= BABY_REVEAL_DATE;

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
        sx={{ minHeight: 'calc(100vh - 56px)', px: 4 }}
      >
        <Box sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: 1.2,
          pt: 4,
          pb: 5,
          px: 5,
          borderRadius: 4,
          width: '100%',
          maxWidth: 340,
        }}>
          {isDemo && (
            <>
              <Box sx={{ color: 'var(--primary-green)', fontSize: '2.8rem' }}>
                <FontAwesomeIcon icon={faCamera} />
              </Box>
              <Typography
                className="common_style"
                sx={{ fontFamily: "'Poppins', 'Kosugi Maru', sans-serif", fontSize: '1.4rem', fontWeight: 500 }}
              >
                Photos & Videos
              </Typography>
              <Box sx={{ display: 'flex', gap: 1.2, color: '#f48fb1' }}>
                <FontAwesomeIcon icon={faHeart} />
                <FontAwesomeIcon icon={faHeart} style={{ opacity: 0.5 }} />
                <FontAwesomeIcon icon={faHeart} />
              </Box>
            </>
          )}

          {!isDemo && (
            <Box
              sx={{
                backgroundColor: '#fff',
                p: '10px',
                pb: '32px',
                boxShadow: '4px 6px 20px rgba(0,0,0,0.16)',
                transform: 'rotate(-2deg)',
                maxWidth: 280,
                width: '100%',
              }}
            >
              <Box
                component="img"
                src={isReady ? REVEAL_PHOTO_URL : PRE_REVEAL_PHOTO_URL}
                alt="photo"
                sx={{
                  width: '100%',
                  display: 'block',
                  objectFit: 'cover',
                  aspectRatio: '4 / 3',
                }}
              />
            </Box>
          )}

          <Box sx={{ display: 'flex', justifyContent: 'center', width: '100%', mt: 4, mb: 1 }}>
            <Button
              variant="contained"
              onClick={handleUpload}
              startIcon={<FontAwesomeIcon icon={faImages} />}
              sx={{
                backgroundColor: 'var(--primary-green)',
                fontFamily: "'Poppins', 'Kosugi Maru', sans-serif",
                fontSize: '0.875rem',
                px: 4,
                py: 1.1,
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
              Share Photos & Videos / 写真・動画をアップロード
            </Button>
          </Box>

          <Typography
            className="common_style"
            sx={{
              fontFamily: "'Poppins', 'Kosugi Maru', sans-serif",
              color: '#666',
              fontSize: '0.88rem',
              lineHeight: 1.8,
              maxWidth: 280,
            }}
          >
            Capture and share the beautiful moments from today!
            <br />
            Your memories are a gift to us.
            <br /><br />
            匿名でアップロード出来るフォトアルバムですので今日皆さんが撮った写真・動画をどしどし共有ください！
          </Typography>

        </Box>
      </Box>
    </Container>
  );
}

export default Photos;
