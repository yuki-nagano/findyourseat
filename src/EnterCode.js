import React, { useState } from 'react';
import { Box, TextField, Button, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChampagneGlasses } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import './common.css';

function EnterCode() {
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (code.trim()) {
      console.log('Submitting code:', code.trim());
      navigate(`/?code=${encodeURIComponent(code.trim())}`);
    }
  };

  return (
    <Box
      sx={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        px: { xs: 2, sm: 3 },
        overflow: 'hidden'
      }}
    >
      
      <Box 
        component="form" 
        onSubmit={handleSubmit}
        sx={{ 
          width: '100%', 
          maxWidth: { xs: '100%', sm: 400 },
          textAlign: 'center'
        }}
      >
        <Typography 
          variant="body1" 
          sx={{ 
            fontFamily: 'Poppins', 
            mb: 3,
            color: '#666'
          }}
        >
          Please enter the access code
        </Typography>
        
        <TextField
          value={code}
          onChange={(e) => setCode(e.target.value)}
          placeholder="Enter code"
          variant="standard"
          fullWidth
          sx={{
            mb: 3,
            '& .MuiInputBase-input': {
              textAlign: 'center',
              fontFamily: 'Poppins',
              fontSize: '1.2rem'
            },
            '& .MuiInput-underline:after': {
              borderBottomColor: 'var(--primary-green)'
            }
          }}
        />
        
        {error && (
          <Typography 
            color="error" 
            sx={{ fontFamily: 'Poppins', mb: 2 }}
          >
            {error}
          </Typography>
        )}
        
        <Button
          type="submit"
          variant="contained"
          sx={{
            backgroundColor: 'var(--primary-green)',
            fontFamily: 'Poppins',
            px: 4,
            py: 1,
            '&:hover': {
              backgroundColor: 'var(--primary-green)',
              opacity: 0.8
            }
          }}
        >
          Enter
        </Button>
      </Box>
    </Box>
  );
}

export default EnterCode;