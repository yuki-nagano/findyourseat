import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { Container, Box, TextField, List, ListItem, ListItemText, Paper, CircularProgress } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChampagneGlasses } from '@fortawesome/free-solid-svg-icons';
import Floor from './Floor';
import Menu from './Menu';
import Photos from './Photos';
import BottomNav from './BottomNav';
import EnterCode from './EnterCode';
import './common.css';

function Home() {
  const [searchName, setSearchName] = useState('');
  const [filteredNames, setFilteredNames] = useState([]);
  const [allNames, setAllNames] = useState([]);
  const [loading, setLoading] = useState(true);
  const location = useLocation();


  const fetchNamesFromGoogleSheets = useCallback(async () => {
    // Check if demo mode
    console.log('Current pathname:', location.pathname);
    console.log('Includes demo:', location.pathname.includes('demo'));
    if (location.pathname.includes('demo')) {
      setTimeout(() => {
        const testNames = [
          'John Smith - Table 1',
          'Alice Smith - Table 1',
          'Jane Doe - Table 2',
          'Bob Johnson - Table 2',
          'Franklin Johnson - Table 2',
          'Mike Johnson - Table 3',
          'George Mike - Table 3',
          'Sarah Wilson - Table 4',
          'David Brown - Table 6',
          'Emily Davis - Table 7',
          'Chris Miller - Table 8',
          'Lisa Garcia - Table 9'
        ];
        setAllNames(testNames);
        setLoading(false);
      }, 1000);
      return;
    }

    try {
      // Using Google Sheets API
      const apiKey = process.env.REACT_APP_GOOGLE_SHEETS_API_KEY;
      const sheetId = process.env.REACT_APP_GOOGLE_SHEETS_ID;
      
      // Get B:(name)とG:(table#)
      const range = 'PAX!B2:G40';
      
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.values) {
        const combinedNames = data.values
          .filter(row => row[0] && row[0].trim()) 
          .map(row => {
            const name = row[0].trim(); // B
            const tableNumber = row[5] ? row[5].trim() : ''; // G
            return tableNumber ? `${name} - Table ${tableNumber}` : name;
          });
        
        setAllNames(combinedNames);
      }
    } catch (error) {
      console.error('Error fetching names:', error);
    } finally {
      setLoading(false);
    }
  }, [location.pathname]);

  useEffect(() => {
    fetchNamesFromGoogleSheets();
  }, [location.pathname, fetchNamesFromGoogleSheets]);
  
  // Skip authentication for demo mode
  console.log('Auth check - pathname:', location.pathname);
  console.log('Auth check - includes demo:', location.pathname.includes('demo'));
  if (!location.pathname.includes('demo')) {
    // Check access code
    const urlParams = new URLSearchParams(location.search);
    const enteredCode = urlParams.get('code');
    const validCode = process.env.REACT_APP_ACCESS_CODE;
    
    console.log('Location search:', location.search);
    console.log('Entered code:', enteredCode);
    console.log('Valid code:', validCode);
    console.log('Match:', enteredCode === validCode);
    
    if (!enteredCode || enteredCode !== validCode) {
      console.log('Redirecting to enter-code');
      return <Navigate to="/enter-code" replace />;
    }
    
    console.log('Authentication passed, showing home page');
  }

  const handleNameChange = (event) => {
    const value = event.target.value;
    setSearchName(value);
    
    if (value.length > 0) {
      const filtered = allNames.filter(name => 
        name.toLowerCase().startsWith(value.toLowerCase())
      );
      setFilteredNames(filtered.slice(0, 5)); // up to 5
    } else {
      setFilteredNames([]);
    }
  };

  const handleNameSelect = (name) => {
    setSearchName(name);
    setFilteredNames([]);
    const seatInfo = name.includes(' - ') ? name.split(' - ')[1] : 'Seat information not available';
    alert(`Welcome ${name.split(' - ')[0]}! Your seat: ${seatInfo}`);
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh"
        sx={{
          px: { xs: 2, sm: 3 },
        }}
      >
        <h1 className="common_style">
          <FontAwesomeIcon icon={faChampagneGlasses} style={{ marginRight: '10px' }} />
          Find Your Seat
        </h1>
        <Box sx={{ position: 'relative', width: '100%', maxWidth: { xs: '100%', sm: 400 } }}>
          {loading ? (
            <CircularProgress sx={{ color: 'var(--primary-green)' }} />
          ) : (
            <>
              <TextField
                id="name-search"
                label="Search Your Name"
                variant="standard"
                value={searchName}
                onChange={handleNameChange}
                fullWidth
                sx={{
                  '& .MuiInputBase-input': {
                    textAlign: 'center',
                    fontFamily: 'Poppins'
                  },
                  '& .MuiInputLabel-root': {
                    textAlign: 'center',
                    width: '100%',
                    transformOrigin: 'center',
                    fontFamily: 'Poppins',
                    '&.Mui-focused': {
                      color: 'var(--primary-green)'
                    }
                  },
                  '& .MuiInput-underline:after': {
                    borderBottomColor: 'var(--primary-green)'
                  }
                }}
              />
              {filteredNames.length > 0 && (
                <Paper 
                  sx={{ 
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    right: 0,
                    maxHeight: 200,
                    overflow: 'auto',
                    zIndex: 1000,
                    mt: 1
                  }}
                >
                  <List>
                    {filteredNames.map((name, index) => (
                      <ListItem 
                        key={index} 
                        button 
                        onClick={() => handleNameSelect(name)}
                        sx={{
                          '&:hover': {
                            backgroundColor: 'var(--primary-green)',
                            color: 'white'
                          }
                        }}
                      >
                        <ListItemText 
                          primary={name.split(' - ')[0]}
                          secondary={name.includes(' - ') ? name.split(' - ')[1] : ''}
                          sx={{ 
                            '& .MuiListItemText-primary': {
                              fontFamily: 'Poppins',
                              textAlign: 'center'
                            },
                            '& .MuiListItemText-secondary': {
                              fontFamily: 'Poppins',
                              textAlign: 'center',
                              color: 'var(--primary-green)'
                            }
                          }}
                        />
                      </ListItem>
                    ))}
                  </List>
                </Paper>
              )}
            </>
          )}
        </Box>
      </Box>
    </Container>
  );
}

// Protected Route Component
function ProtectedRoute({ children }) {
  const location = useLocation();
  const urlParams = new URLSearchParams(location.search);
  const enteredCode = urlParams.get('code');
  const validCode = process.env.REACT_APP_ACCESS_CODE || 'wedding2024';
  
  if (!enteredCode || enteredCode !== validCode) {
    return <Navigate to="/enter-code" replace />;
  }
  
  return children;
}

function App() {
  const basename = process.env.NODE_ENV === 'production' ? '/findyourseat' : '';
  
  return (
    <Router basename={basename}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/demo" element={<Home />} />
        <Route path="/demo/floor" element={<Floor />} />
        <Route path="/demo/menu" element={<Menu />} />
        <Route path="/demo/photos" element={<Photos />} />
        <Route path="/enter-code" element={<EnterCode />} />
        <Route path="/floor" element={<ProtectedRoute><Floor /></ProtectedRoute>} />
        <Route path="/menu" element={<ProtectedRoute><Menu /></ProtectedRoute>} />
        <Route path="/photos" element={<ProtectedRoute><Photos /></ProtectedRoute>} />
      </Routes>
      <BottomNav />
    </Router>
  );
}

export default App;
