import React from 'react';
import { Container, Box } from '@mui/material';
import './common.css';

function Floor() {
  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
      >
        <h1 className="common_style">
          Coming Soon
        </h1>
      </Box>
    </Container>
  );
}

export default Floor;