import React, { useState, useEffect, useRef } from 'react';
import { Container, Box, Button, Typography, Paper } from '@mui/material';
import { useLocation } from 'react-router-dom';
import { BABY_REVEAL_DATE } from './config';
import './common.css';

function getTimeLeft() {
  const diff = BABY_REVEAL_DATE - new Date();
  if (diff <= 0) return null;
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
    minutes: Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60)),
    seconds: Math.floor((diff % (1000 * 60)) / 1000),
  };
}


function TimeBox({ value, label }) {
  return (
    <Box sx={{ textAlign: 'center' }}>
      <Paper elevation={0} sx={{ width: 64, height: 64, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 3, background: 'linear-gradient(135deg, #e8f5e9 0%, #f1f8e9 100%)', border: '1.5px solid #c8e6c9' }}>
        <Typography sx={{ fontFamily: "'Poppins', 'Kosugi Maru', sans-serif", fontWeight: 700, fontSize: '1.7rem', color: 'var(--primary-green)', lineHeight: 1 }}>
          {String(value).padStart(2, '0')}
        </Typography>
      </Paper>
      <Typography sx={{ fontFamily: "'Poppins', 'Kosugi Maru', sans-serif", fontSize: '0.6rem', color: '#bbb', mt: 0.5, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
        {label}
      </Typography>
    </Box>
  );
}

function Countdown() {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft());
  const firedRef = useRef(false);

  useEffect(() => {
    const id = setInterval(() => {
      const t = getTimeLeft();
      setTimeLeft(t);
      if (!t && !firedRef.current) {
        firedRef.current = true;
      }
    }, 1000);
    return () => clearInterval(id);
  }, []);

  if (!timeLeft) {
    return (
      <Box sx={{ textAlign: 'center' }}>
        <Typography sx={{ fontSize: '2rem', lineHeight: 1, mb: 1 }}>🎈</Typography>
        <Typography sx={{ fontFamily: "'Poppins', 'Kosugi Maru', sans-serif", fontSize: '1rem', color: '#888' }}>
          Refresh the page!
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 3 }}>
      <Box sx={{ textAlign: 'center' }}>
        <Typography sx={{ fontSize: '2rem', lineHeight: 1, mb: 0.5 }}>🎈</Typography>
        <Typography sx={{ fontFamily: "'Poppins', 'Kosugi Maru', sans-serif", fontSize: '1.4rem', fontWeight: 600, color: '#444', mt: 0.5 }}>
          Coming Soon
        </Typography>
        <Typography sx={{ fontFamily: "'Poppins', 'Kosugi Maru', sans-serif", fontSize: '0.75rem', color: '#ccc', mt: 0.4 }}>
          September 18, 2026 · Los Angeles
        </Typography>
      </Box>

      <Box sx={{ display: 'flex', gap: 1.2, alignItems: 'flex-start' }}>
        <TimeBox value={timeLeft.days} label="Days" />
        <Typography sx={{ fontFamily: "'Poppins', 'Kosugi Maru', sans-serif", fontSize: '1.6rem', fontWeight: 300, color: '#ccc', mt: '10px' }}>:</Typography>
        <TimeBox value={timeLeft.hours} label="Hours" />
        <Typography sx={{ fontFamily: "'Poppins', 'Kosugi Maru', sans-serif", fontSize: '1.6rem', fontWeight: 300, color: '#ccc', mt: '10px' }}>:</Typography>
        <TimeBox value={timeLeft.minutes} label="Min" />
        <Typography sx={{ fontFamily: "'Poppins', 'Kosugi Maru', sans-serif", fontSize: '1.6rem', fontWeight: 300, color: '#ccc', mt: '10px' }}>:</Typography>
        <TimeBox value={timeLeft.seconds} label="Sec" />
      </Box>

      <Typography sx={{ fontFamily: "'Poppins', 'Kosugi Maru', sans-serif", fontSize: '0.75rem', color: '#bbb', letterSpacing: '0.08em' }}>
        Stay tuned 🩵🩵
      </Typography>
    </Box>
  );
}

function BabyRegistry() {
  const location = useLocation();
  const isDemo = location.pathname.includes('demo');
  const isReady = new Date() >= BABY_REVEAL_DATE;

  if (isDemo || !isReady) {
    return (
      <Container maxWidth="sm">
        <Box display="flex" justifyContent="center" alignItems="center" sx={{ minHeight: 'calc(100dvh - 56px)', px: 3 }}>
          {isDemo ? (
            <Typography className="common_style" sx={{ fontFamily: "'Poppins', 'Kosugi Maru', sans-serif", fontSize: '1.2rem' }}>
              Coming Soon
            </Typography>
          ) : (
            <Countdown />
          )}
        </Box>
      </Container>
    );
  }

  return (
    <Container maxWidth="sm">
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        sx={{ minHeight: 'calc(100dvh - 56px)', px: 4, gap: 3 }}
      >

        <Box sx={{ textAlign: 'center' }}>
          <Typography sx={{ fontFamily: "'Poppins', 'Kosugi Maru', sans-serif", fontSize: '1.6rem', fontWeight: 600, color: '#333', lineHeight: 1.3 }}>
            Our baby boy
          </Typography>
          <Typography sx={{ fontFamily: "'Poppins', 'Kosugi Maru', sans-serif", fontSize: '1.6rem', fontWeight: 600, color: 'var(--primary-green)', lineHeight: 1.3 }}>
            is on the way! 👶
          </Typography>
        </Box>

        <Typography
          className="common_style"
          sx={{ fontFamily: "'Poppins', 'Kosugi Maru', sans-serif", fontSize: '0.9rem', color: '#888', lineHeight: 1.9, maxWidth: 300 }}
        >
          We're so grateful to celebrate with you! If you'd like to contribute to our registry, links below!
        <br />
          新しい命の誕生を皆さんと一緒にお祝いできて嬉しいです。贈り物を考えてくれている方はこちらから！
        </Typography>

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '100%', maxWidth: 300 }}>

          <Box>
            <Box sx={{ display: 'flex', gap: 1 }}>
              <Button variant="contained" href="https://www.amazon.co.jp/baby-reg/--2-2027/35PYGN9KISYXW" target="_blank" fullWidth
                sx={{ backgroundColor: 'var(--primary-green)', fontFamily: "'Poppins', 'Kosugi Maru', sans-serif", fontSize: '0.875rem', py: 1.2, borderRadius: 3, textTransform: 'none', boxShadow: '0 4px 12px rgba(76, 175, 80, 0.35)', '&:hover': { backgroundColor: 'var(--primary-green)', opacity: 0.85 } }}>
                🇯🇵 Japan
              </Button>
              <Button variant="contained" href="https://my.babylist.com/yuki-and-kenji-lin" target="_blank" fullWidth
                sx={{ backgroundColor: 'var(--primary-green)', fontFamily: "'Poppins', 'Kosugi Maru', sans-serif", fontSize: '0.875rem', py: 1.2, borderRadius: 3, textTransform: 'none', boxShadow: '0 4px 12px rgba(76, 175, 80, 0.35)', '&:hover': { backgroundColor: 'var(--primary-green)', opacity: 0.85 } }}>
                🇺🇸 US
              </Button>
            </Box>
          </Box>

          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box sx={{ flex: 1, height: '1px', bgcolor: '#ddd' }} />
            <Typography sx={{ fontFamily: "'Poppins', 'Kosugi Maru', sans-serif", fontSize: '0.8rem', color: '#bbb' }}>or</Typography>
            <Box sx={{ flex: 1, height: '1px', bgcolor: '#ddd' }} />
          </Box>

          <Box>
            <Typography sx={{ fontFamily: "'Poppins', 'Kosugi Maru', sans-serif", fontSize: '0.8rem', color: '#aaa', textAlign: 'center', mb: 0.5 }}>
              ✈️ Honeymoon Fund
            </Typography>
            <Typography className="common_style" sx={{ fontFamily: "'Poppins', 'Kosugi Maru', sans-serif", fontSize: '0.78rem', color: '#bbb', mb: 1, lineHeight: 1.6 }}>
              Baby's coming, honeymoon is on hold... 🥲
              <br />
              Help us get there someday!
            </Typography>
            <Button variant="outlined" href="" target="_blank" fullWidth
              sx={{ fontFamily: "'Poppins', 'Kosugi Maru', sans-serif", fontSize: '0.875rem', py: 1.2, borderRadius: 3, textTransform: 'none', borderColor: 'var(--primary-green)', color: 'var(--primary-green)', '&:hover': { borderColor: 'var(--primary-green)', opacity: 0.85 } }}>
              Venmo
            </Button>
          </Box>

        </Box>
      </Box>
    </Container>
  );
}

export default BabyRegistry;
