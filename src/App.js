import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Container, Box, TextField, List, ListItem, ListItemText, Paper, CircularProgress, Dialog, Button, Typography } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChampagneGlasses } from '@fortawesome/free-solid-svg-icons';
import confetti from 'canvas-confetti';
import BabyRegistry from './BabyRegistry';
import Menu from './Menu';
import Photos from './Photos';
import BottomNav from './BottomNav';
import EnterCode from './EnterCode';
import { BABY_REVEAL_DATE } from './config';
import './common.css';

function fireRevealConfetti() {
  const colors = ['#4caf50', '#81c784', '#f48fb1', '#fff176', '#90caf9'];
  let count = 0;
  const id = setInterval(() => {
    confetti({ particleCount: 15, angle: 60, spread: 65, origin: { x: 0 }, colors });
    confetti({ particleCount: 15, angle: 120, spread: 65, origin: { x: 1 }, colors });
    if (++count >= 7) clearInterval(id);
  }, 350);
}

function RevealPopup() {
  const location = useLocation();
  const navigate = useNavigate();
  const isDemo = location.pathname.includes('demo');
  const isReady = new Date() >= BABY_REVEAL_DATE;
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (isReady && !isDemo && !sessionStorage.getItem('babyRevealSeen')) {
      setOpen(true);
      fireRevealConfetti();
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleClose = () => {
    sessionStorage.setItem('babyRevealSeen', '1');
    setOpen(false);
    const urlParams = new URLSearchParams(location.search);
    const codeParam = urlParams.get('code');
    navigate(codeParam ? `/registry?code=${codeParam}` : '/registry');
  };

  if (!open) return null;

  return (
    <Dialog
      open={open}
      PaperProps={{
        sx: { borderRadius: 4, px: 4, py: 4, textAlign: 'center', boxShadow: '0 8px 40px rgba(0,0,0,0.18)', minWidth: 280 }
      }}
    >
      <Typography sx={{ fontSize: '3rem', lineHeight: 1, mb: 1.5 }}>🎉</Typography>
      <Typography sx={{ fontFamily: "'Poppins', 'Kosugi Maru', sans-serif", fontSize: '1.4rem', fontWeight: 700, color: 'var(--primary-green)', mb: 0.8 }}>
        It's time!
      </Typography>
      <Typography sx={{ fontFamily: "'Poppins', 'Kosugi Maru', sans-serif", fontSize: '0.85rem', color: '#888', lineHeight: 1.8, mb: 2.5 }}>
        We just dropped a big announcement!
        <br />
        この度新しい命を授かりました！👶
        <br />
        Check out our Baby Registry!
      </Typography>
      <Button
        variant="contained"
        onClick={handleClose}
        fullWidth
        sx={{
          backgroundColor: 'var(--primary-green)',
          fontFamily: "'Poppins', 'Kosugi Maru', sans-serif",
          fontSize: '0.9rem',
          py: 1.2,
          borderRadius: 3,
          textTransform: 'none',
          boxShadow: '0 4px 12px rgba(76, 175, 80, 0.35)',
          '&:hover': { backgroundColor: 'var(--primary-green)', opacity: 0.85 },
        }}
      >
        Go to Baby Registry / ベビーリストを見る →
      </Button>
    </Dialog>
  );
}

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, info) {
    console.error('ErrorBoundary caught:', error, info);
  }
  render() {
    if (this.state.hasError) {
      return (
        <Box sx={{ p: 4, textAlign: 'center' }}>
          <h2>Something went wrong</h2>
          <pre style={{ color: 'red', textAlign: 'left', whiteSpace: 'pre-wrap' }}>
            {this.state.error?.toString()}
          </pre>
        </Box>
      );
    }
    return this.props.children;
  }
}

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
          { display: 'John Smith - Table 1', searchKey: 'John Smith' },
          { display: 'Alice Smith - Table 1', searchKey: 'Alice Smith' },
          { display: 'Jane Doe - Table 2', searchKey: 'Jane Doe' },
          { display: 'Bob Johnson - Table 2', searchKey: 'Bob Johnson' },
          { display: 'Franklin Johnson - Table 2', searchKey: 'Franklin Johnson' },
          { display: 'Mike Johnson - Table 3', searchKey: 'Mike Johnson' },
          { display: 'George Mike - Table 3', searchKey: 'George Mike' },
          { display: 'Sarah Wilson - Table 4', searchKey: 'Sarah Wilson' },
          { display: 'David Brown - Table 6', searchKey: 'David Brown' },
          { display: 'Emily Davis - Table 7', searchKey: 'Emily Davis' },
          { display: 'Chris Miller - Table 8', searchKey: 'Chris Miller' },
          { display: 'Lisa Garcia - Table 9', searchKey: 'Lisa Garcia' },
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
      
      // B: English name, C: Hiragana, D: Table number
      const range = 'PAX!B2:D45';

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
            const english = row[0].trim();
            const hiragana = row[2] ? row[2].trim() : '';
            const tableNumber = row[1] ? row[1].trim() : '';
            const display = tableNumber ? `${english} - Table ${tableNumber}` : english;
            return { display, searchKey: `${english} ${hiragana}` };
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
    const enteredCode = urlParams.get('code')?.toLowerCase();
    const validCode = (process.env.REACT_APP_ACCESS_CODE || 'wedding2024').toLowerCase();
    
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
      const filtered = allNames.filter(item =>
        item.searchKey.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredNames(filtered.slice(0, 5));
    } else {
      setFilteredNames([]);
    }
  };

  const handleNameSelect = (item) => {
    setSearchName(item.display);
    setFilteredNames([]);
  };

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{
          minHeight: 'calc(100dvh - 56px)',
          px: { xs: 2, sm: 3 },
        }}
      >
        <h1 className="common_style" style={{ fontSize: 'clamp(1.6rem, 7vw, 2.4rem)', whiteSpace: 'nowrap' }}>
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
                label="Search Your Name / 名前を検索"
                variant="standard"
                value={searchName}
                onChange={handleNameChange}
                fullWidth
                sx={{
                  '& .MuiInputBase-input': {
                    textAlign: 'center',
                    fontFamily: "'Poppins', 'Kosugi Maru', sans-serif"
                  },
                  '& .MuiInputLabel-root': {
                    textAlign: 'center',
                    width: '100%',
                    transformOrigin: 'center',
                    fontFamily: "'Poppins', 'Kosugi Maru', sans-serif",
                    '&.Mui-focused': {
                      color: 'var(--primary-green)'
                    }
                  },
                  '& .MuiInput-underline:after': {
                    borderBottomColor: 'var(--primary-green)'
                  },
                  '& .MuiInput-underline:hover:not(.Mui-disabled):before': {
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
                    {filteredNames.map((item, index) => (
                      <ListItem
                        key={index}
                        button
                        onClick={() => handleNameSelect(item)}
                        sx={{
                          '&:hover': {
                            color: 'black'
                          }
                        }}
                      >
                        <ListItemText
                          primary={item.display.split(' - ')[0]}
                          secondary={item.display.includes(' - ') ? item.display.split(' - ')[1] : ''}
                          sx={{ 
                            '& .MuiListItemText-primary': {
                              fontFamily: "'Poppins', 'Kosugi Maru', sans-serif",
                              textAlign: 'center'
                            },
                            '& .MuiListItemText-secondary': {
                              fontFamily: "'Poppins', 'Kosugi Maru', sans-serif",
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
  const enteredCode = urlParams.get('code')?.toLowerCase();
  const validCode = (process.env.REACT_APP_ACCESS_CODE).toLowerCase();
  
  if (!enteredCode || enteredCode !== validCode) {
    return <Navigate to="/enter-code" replace />;
  }
  
  return children;
}

function App() {
  const basename = process.env.NODE_ENV === 'production' ? '/findyourseat' : '';
  
  return (
    <ErrorBoundary>
      <Router basename={basename}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/demo" element={<Home />} />
          <Route path="/demo/registry" element={<BabyRegistry />} />
          <Route path="/demo/menu" element={<Menu />} />
          <Route path="/demo/photos" element={<Photos />} />
          <Route path="/enter-code" element={<EnterCode />} />
          <Route path="/registry" element={<ProtectedRoute><BabyRegistry /></ProtectedRoute>} />
          <Route path="/menu" element={<ProtectedRoute><Menu /></ProtectedRoute>} />
          <Route path="/photos" element={<ProtectedRoute><Photos /></ProtectedRoute>} />
        </Routes>
        <BottomNav />
        <RevealPopup />
      </Router>
    </ErrorBoundary>
  );
}

export default App;
