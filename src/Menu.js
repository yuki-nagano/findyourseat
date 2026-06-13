import React from 'react';
import { Container, Box, Typography } from '@mui/material';
import './common.css';

const FOOD_EMBED_URL = 'https://www.canva.com/design/DAHMfs7WTss/1dbBHVwFYM4BaGRTGhHR9w/view?embed';

const drinkImages = [
  // { src: 'https://...', alt: 'Drink item name' },
];

function Menu() {
  return (
    <Container maxWidth="sm" disableGutters>
      <Box
        sx={{
          minHeight: 'calc(100vh - 56px)',
          display: 'flex',
          flexDirection: 'column',
          gap: 4,
          pt: 5,
          pb: 4,
          px: 2,
        }}
      >
        <Box>
          <Typography
            className="common_style"
            sx={{ fontFamily: 'Poppins', fontSize: '1.1rem', fontWeight: 500, mb: 1.5 }}
          >
            Food Menu
          </Typography>
          <Box sx={{ position: 'relative', width: '100%', paddingTop: '148%', borderRadius: 3, overflow: 'hidden' }}>
            <iframe
              loading="lazy"
              style={{ position: 'absolute', width: '100%', height: '100%', top: 0, left: 0, border: 'none' }}
              src={FOOD_EMBED_URL}
              allowFullScreen
              allow="fullscreen"
              title="Food Menu"
            />
          </Box>
        </Box>

        <Box>
          <Typography
            className="common_style"
            sx={{ fontFamily: 'Poppins', fontSize: '1.1rem', fontWeight: 500, mb: 1.5 }}
          >
            Drink Menu
          </Typography>
          <Box
            sx={{
              display: 'flex',
              overflowX: 'auto',
              gap: 1.5,
              pb: 1,
              WebkitOverflowScrolling: 'touch',
              '&::-webkit-scrollbar': { display: 'none' },
              scrollbarWidth: 'none',
            }}
          >
            {drinkImages.length === 0 ? (
              [1, 2, 3].map((i) => (
                <Box key={i} sx={{ minWidth: 260, height: 340, backgroundColor: '#f0f0f0', borderRadius: 3, flexShrink: 0 }} />
              ))
            ) : (
              drinkImages.map((img, i) => (
                <Box
                  key={i}
                  component="img"
                  src={img.src}
                  alt={img.alt}
                  sx={{ minWidth: 260, height: 340, borderRadius: 3, objectFit: 'cover', flexShrink: 0 }}
                />
              ))
            )}
          </Box>
        </Box>
      </Box>
    </Container>
  );
}

export default Menu;
