import React from 'react';
import { Box, BottomNavigation, BottomNavigationAction } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import { BABY_REVEAL_DATE } from './config';
import './common.css';

function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const isDemo = location.pathname.includes('demo');

  const getValueFromPath = (path) => {
    if (path === '/' || path === '/demo') return 0;
    if (path === '/registry' || path === '/demo/registry') return 1;
    if (path === '/menu' || path === '/demo/menu') return 2;
    if (path === '/photos' || path === '/demo/photos') return 3;
    return 0;
  };

  const handleChange = (event, newValue) => {
    const prefix = isDemo ? '/demo' : '';
    const urlParams = new URLSearchParams(location.search);
    const codeParam = urlParams.get('code');
    const queryString = codeParam && !isDemo ? `?code=${codeParam}` : '';

    switch (newValue) {
      case 0: navigate(isDemo ? '/demo' : `/${queryString}`); break;
      case 1: navigate(`${prefix}/registry${queryString}`); break;
      case 2: navigate(`${prefix}/menu${queryString}`); break;
      case 3: navigate(`${prefix}/photos${queryString}`); break;
      default: navigate(isDemo ? '/demo' : `/${queryString}`); break;
    }
  };

  return (
    <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, boxShadow: '0 -2px 8px rgba(0,0,0,0.1)' }}>
      <BottomNavigation
        value={getValueFromPath(location.pathname)}
        onChange={handleChange}
        sx={{
          '& .MuiBottomNavigationAction-label': {
            fontFamily: "'Poppins', 'Kosugi Maru', sans-serif",
            fontSize: '0.65rem',
          },
          '& .MuiBottomNavigationAction-root:not(.Mui-selected) .MuiBottomNavigationAction-label': {
            display: 'none',
          },
          '& .MuiBottomNavigationAction-root:not(.Mui-selected)': {
            justifyContent: 'center',
            paddingTop: '8px',
            paddingBottom: '8px',
          },
          '& .Mui-selected .MuiBottomNavigationAction-label': {
            fontSize: '0.85rem',
            fontWeight: 600,
          },
          '& .Mui-selected': {
            color: 'var(--primary-green) !important'
          },
          '& .Mui-selected .nav-emoji': {
            display: 'none'
          }
        }}
      >
        <BottomNavigationAction label="Seating Chart" icon={<span className="nav-emoji" style={{ fontSize: '1.7rem' }}>🪑</span>} />
        <BottomNavigationAction label={!isDemo && new Date() >= BABY_REVEAL_DATE ? 'Baby Registry' : '???'} icon={<span className="nav-emoji" style={{ fontSize: '1.7rem' }}>{!isDemo && new Date() >= BABY_REVEAL_DATE ? '👶' : '🎈'}</span>} />
        <BottomNavigationAction label="Food/Drink Menu" icon={<span className="nav-emoji" style={{ fontSize: '1.7rem' }}>🍽️</span>} />
        <BottomNavigationAction label="Photos & Videos" icon={<span className="nav-emoji" style={{ fontSize: '1.7rem' }}>📷</span>} />
      </BottomNavigation>
    </Box>
  );
}

export default BottomNav;
