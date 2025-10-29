import React, { useState, useEffect } from 'react';
import { HashRouter as Router, Routes, Route } from 'react-router-dom';
import { Box, TextField, List, ListItem, ListItemText, Paper, CircularProgress } from '@mui/material';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChampagneGlasses } from '@fortawesome/free-solid-svg-icons';
import Floor from './Floor';
import Menu from './Menu';
import Photos from './Photos';
import BottomNav from './BottomNav';
import './common.css';

function Home() {
  const [searchName, setSearchName] = useState('');
  const [filteredNames, setFilteredNames] = useState([]);
  const [allNames, setAllNames] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchNamesFromGoogleSheets();
  }, []);

  const fetchNamesFromGoogleSheets = async () => {
    // テスト用データ（スプレッドシートの形式問題のため）
    // setTimeout(() => {
    //   const testNames = [
    //     'John Smith - Table 1',
    //     'Jane Doe - Table 2',
    //     'Mike Johnson - Table 3',
    //     'Sarah Wilson - Table 4',
    //     'David Brown - Table 6',
    //     'Emily Davis - Table 7',
    //     'Chris Miller - Table 8',
    //     'Lisa Garcia - Table 9'
    //   ];
    //   setAllNames(testNames);
    //   setLoading(false);
    // }, 1000);
    
    // Google Sheets API（スプレッドシートをGoogle Sheets形式に変換後に有効化）

    try {
      const apiKey = process.env.REACT_APP_GOOGLE_SHEETS_API_KEY;
      const sheetId = process.env.REACT_APP_GOOGLE_SHEETS_ID;
      

      
      // Bカラム（名前）とGカラム（テーブル番号）を同時に取得
      const range = 'PAX!B2:G40';
      
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${sheetId}/values/${range}?key=${apiKey}`;
      const response = await fetch(url);
      
      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }
      
      const data = await response.json();
      
      if (data.values) {
        const combinedNames = data.values
          .filter(row => row[0] && row[0].trim()) // Bカラム（インデックス0）に名前がある行のみ
          .map(row => {
            const name = row[0].trim(); // Bカラム
            const tableNumber = row[5] ? row[5].trim() : ''; // Gカラム（インデックス5）
            return tableNumber ? `${name} - Table ${tableNumber}` : name;
          });
        
        setAllNames(combinedNames);
      }
    } catch (error) {
      console.error('Error fetching names:', error);
    } finally {
      setLoading(false);
    }
    
  };

  const handleNameChange = (event) => {
    const value = event.target.value;
    setSearchName(value);
    
    if (value.length > 0) {
      const filtered = allNames.filter(name => 
        name.toLowerCase().includes(value.toLowerCase())
      );
      setFilteredNames(filtered.slice(0, 5)); // 最大5件表示
    } else {
      setFilteredNames([]);
    }
  };

  const handleNameSelect = (name) => {
    setSearchName(name);
    setFilteredNames([]);
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
  );
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/floor" element={<Floor />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/photos" element={<Photos />} />
      </Routes>
      <BottomNav />
    </Router>
  );
}

export default App;
