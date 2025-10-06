import React from 'react';
import { Button, Box, Typography, CircularProgress } from '@mui/material';
import { useAuth0 } from '@auth0/auth0-react';
import { useNavigate } from 'react-router-dom';

const WelcomeScreen = () => {
  const { loginWithRedirect, logout, isAuthenticated, isLoading, user } = useAuth0();
  const navigate = useNavigate();

  const handleLogin = () => {
    loginWithRedirect();
  };

  const handlePlay = () => {
    navigate('/app');
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          backgroundColor: 'background.default',
          color: 'text.primary',
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        backgroundColor: 'background.default',
        color: 'text.primary',
      }}
    >
      <Typography variant="h2" component="div" sx={{ mb: 4, fontWeight: 'bold' }}>
        SubtleSolve
      </Typography>

      <Button
        variant="contained"
        color="primary"
        sx={{ mb: 2, width: '200px', height: '60px', borderRadius: '30px' }}
        onClick={handlePlay}
      >
        Play
      </Button>

      <div>
        {!isAuthenticated ? (
          <Button
            variant="outlined"
            color="primary"
            sx={{
              width: '200px',
              height: '60px',
              borderRadius: '30px',
              borderColor: '#1976d2',
              color: '#1976d2',
            }}
            onClick={handleLogin}
          >
            Login
          </Button>
        ) : (
          <Button
            variant="outlined"
            color="secondary"
            sx={{
              width: '200px',
              height: '60px',
              borderRadius: '30px',
              borderColor: '#1976d2',
              color: '#1976d2',
            }}
            onClick={() => logout({ logoutParams: { returnTo: window.location.origin } })}
          >
            Logout ({user?.name || 'User'})
          </Button>
        )}
      </div>
    </Box>
  );
};

export default WelcomeScreen;