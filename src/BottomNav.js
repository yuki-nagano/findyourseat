import React from 'react';
import { Box, BottomNavigation, BottomNavigationAction } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import './common.css';

function BottomNav() {
  const navigate = useNavigate();
  const location = useLocation();

  const getValueFromPath = (path) => {
    switch (path) {
      case '/': return 0;
      case '/floor': return 1;
      case '/menu': return 2;
      case '/photos': return 3;
      default: return 0;
    }
  };

  const handleChange = (event, newValue) => {
    switch (newValue) {
      case 0: navigate('/'); break;
      case 1: navigate('/floor'); break;
      case 2: navigate('/menu'); break;
      case 3: navigate('/photos'); break;
      default: navigate('/'); break;
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
        <BottomNavigationAction label="Floor" />
        <BottomNavigationAction label="Menu" />
        <BottomNavigationAction label="Photos" />
      </BottomNavigation>
    </Box>
  );
}

export default BottomNav;