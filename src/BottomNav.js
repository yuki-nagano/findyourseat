import React from 'react';
import { Box, BottomNavigation, BottomNavigationAction } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import './common.css';

function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const isDemo = location.pathname.includes('demo');
  
  const getValueFromPath = (path) => {
    if (path === '/' || path === '/demo') return 0;
    if (path === '/floor' || path === '/demo/floor') return 1;
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
      case 1: navigate(`${prefix}/floor${queryString}`); break;
      case 2: navigate(`${prefix}/menu${queryString}`); break;
      case 3: navigate(`${prefix}/photos${queryString}`); break;
      default: navigate(isDemo ? '/demo' : `/${queryString}`); break;
    }
  };

  return (
    <Box sx={{ position: 'fixed', bottom: 0, left: 0, right: 0, boxShadow: '0 -2px 8px rgba(0,0,0,0.1)' }}>
      <BottomNavigation
        showLabels
        value={getValueFromPath(location.pathname)}
        onChange={handleChange}
        sx={{
          '& .MuiBottomNavigationAction-label': {
            fontFamily: 'Poppins'
          },
          '& .Mui-selected': {
            color: 'var(--primary-green) !important'
          }
        }}
      >
        <BottomNavigationAction label="Find Your Seat" />
        <BottomNavigationAction label="Floor Plan" />
        <BottomNavigationAction label="Food/Beverage Menu" />
        <BottomNavigationAction label="Photos" />
      </BottomNavigation>
    </Box>
  );
}

export default BottomNav;