import React, { useState } from 'react';
import { Container, Box, Tabs, Tab } from '@mui/material';
import './common.css';

const FOOD_EMBED_URL = 'https://www.canva.com/design/DAHMfs7WTss/1dbBHVwFYM4BaGRTGhHR9w/view?embed';
const DRINK_EMBED_URL = 'https://www.canva.com/design/DAHMf1zeAoc/FvNQQRcCsk4swk5vZaIBtg/view?embed';

function Menu() {
  const [tab, setTab] = useState(0);

  return (
    <Container maxWidth="sm" disableGutters sx={{ height: 'calc(100vh - 56px)', display: 'flex', flexDirection: 'column' }}>
      <Tabs
        value={tab}
        onChange={(_, v) => setTab(v)}
        variant="fullWidth"
        sx={{
          borderBottom: '1px solid #eee',
          flexShrink: 0,
          '& .MuiTab-root': {
            fontFamily: "'Poppins', 'Kosugi Maru', sans-serif",
            fontSize: '0.85rem',
            textTransform: 'none',
            color: '#aaa',
          },
          '& .Mui-selected': { color: 'var(--primary-green) !important', fontWeight: 600 },
          '& .MuiTabs-indicator': { backgroundColor: 'var(--primary-green)' },
        }}
      >
        <Tab label="🍔 Food Menu" />
        <Tab label="🥂 Drink Menu" />
      </Tabs>

      <Box sx={{ flex: 1, overflow: 'hidden' }}>
        <iframe
          key={tab === 0 ? 'food' : 'drink'}
          loading="lazy"
          style={{
            display: tab === 0 ? 'block' : 'none',
            width: '100%',
            height: '100%',
            border: 'none',
          }}
          src={FOOD_EMBED_URL}
          allowFullScreen
          allow="fullscreen"
          title="Food Menu"
        />
        <iframe
          loading="lazy"
          style={{
            display: tab === 1 ? 'block' : 'none',
            width: '100%',
            height: '100%',
            border: 'none',
          }}
          src={DRINK_EMBED_URL}
          allowFullScreen
          allow="fullscreen"
          title="Drink Menu"
        />
      </Box>
    </Container>
  );
}

export default Menu;
