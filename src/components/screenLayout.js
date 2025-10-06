import React, { useState, useEffect } from 'react';
// import { useKeycloak } from '@react-keycloak/web';
import { useAuth0 } from '@auth0/auth0-react';
import { PuzzleService } from '../services/PuzzleService';
import { Alert, CircularProgress, Container, Paper, Typography, Box } from '@mui/material';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import Types from './categoryTitle';
import AnswerField from './answerField';
import ListDividers from './clueList';
import StatsDialog from './StatsDialog';

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#bb86fc',
    },
    background: {
      default: '#121212',
      paper: '#1e1e1e',
    },
    text: {
      primary: '#ffffff',
      secondary: '#b0b0b0',
    },
  },
  typography: {
    fontFamily: 'Roboto, sans-serif',
    h6: {
      fontWeight: 500,
      fontSize: '1.25rem',
    },
    body2: {
      color: '#b0b0b0',
    },
  },
});

export default function ScreenLayout() {
  const pluralize = require('pluralize');
  // const { keycloak, initialized } = useKeycloak();
  const { isAuthenticated, getAccessTokenSilently, isLoading } = useAuth0();
  const [data, setData] = useState(null);
  const [submits, setSubmits] = useState([]);
  const [openStatsAnswer, setOpenStatsAnswer] = useState(false);
  const [statsData, setStatsData] = useState({});
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  useEffect(() => {
    const fetchDailyPuzzle = async () => {
      try {
        const result = await PuzzleService.Getdailypuzzle();
        setData(result.data);
      } catch (err) {
        setError(err);
      } finally {
        setLoading(false);
      }
    };
    fetchDailyPuzzle();
  }, []);

  useEffect(() => {
    if (!isLoading && isAuthenticated && data && data.dailyGameId) {
      const fetchGameHistory = async () => {
        try {
          const token = await getAccessTokenSilently();
          const response = await PuzzleService.getGameHistory(data.dailyGameId, token);
          const guessList = response.data;
          setSubmits(guessList);
          if (guessList.length === 6 || guessList.includes(data.answer)) {
            const statResponse = await PuzzleService.getStats(token);
            setStatsData(statResponse.data);
            setOpenStatsAnswer(true);
          }
        } catch (error) {
          console.error('Error fetching game history:', error);
        }
      };
      fetchGameHistory();
    }
  }, [isLoading, isAuthenticated, getAccessTokenSilently, data]);

  const onSubmit = (guessList) => {
    setSubmits(guessList);
  };

  const handleCloseStatsAnswer = () => {
    setOpenStatsAnswer(false);
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh', backgroundColor: '#121212' }}>
        <CircularProgress color="primary" />
        <Typography variant="h6" sx={{ ml: 2, color: '#ffffff' }}>Getting your puzzle for today...</Typography>
      </Box>
    );
  }

  if (error || !data || !data.category) {
    return <Alert severity="error">Error reading JSON</Alert>;
  }

  return (
    <ThemeProvider theme={darkTheme}>
      <Container maxWidth="sm">
        <Paper elevation={3} sx={{ mt: 10, p: 3, borderRadius: 2, backgroundColor: '#1e1e1e', color: '#ffffff' }}>
          <Types category={data.category} />
          <AnswerField
            category={pluralize.singular(data.category)}
            answer={data.answer}
            onSubmit={onSubmit}
            gameID={data.dailyGameId}
            guessList={submits}
          />
          <ListDividers clueList={data.clues} guessList={submits} answer={data.answer} />
          <StatsDialog
            open={openStatsAnswer}
            handleClose={handleCloseStatsAnswer}
            played={statsData.played}
            win_percent={statsData.win_percent}
            currentStreak={statsData.currentStreak}
            bestStreak={statsData.bestStreak}
            scoreDistribution={statsData.scoreDistribution}
          />
        </Paper>
      </Container>
    </ThemeProvider>
  );
}
