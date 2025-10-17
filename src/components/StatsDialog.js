import React from 'react';
import {
  Dialog,
  DialogContent,
  Card,
  CardContent,
  Button,
  Box,
  Typography,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';
import ShareIcon from '@mui/icons-material/Share';
import TwitterIcon from '@mui/icons-material/X';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, ChartDataLabels);

export default function StatsDialog({ open, handleClose, played, win_percent, currentStreak, bestStreak, scoreDistribution }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const scores = [];
  for (var key in scoreDistribution) {
    scores.push(scoreDistribution[key]);
  }

  const chartData = {
    labels: ['0', '1', '2', '3', '4', '5'],
    datasets: [{
      data: scores,
      backgroundColor: theme.palette.primary.main,
      borderColor: theme.palette.primary.dark,
      borderWidth: 1,
    }],
  };

  const options = {
    indexAxis: 'y',
    scales: {
      x: { display: false },
      y: { 
        display: true, 
        grid: { display: false },
        ticks: {
          font: { size: 12 },
          color: theme.palette.text.primary,
        }
      },
    },
    plugins: {
      title: {
        display: true,
        text: 'Points Distribution',
        font: { size: 16, weight: 'bold' },
        color: theme.palette.text.primary,
        padding: { bottom: 10 }
      },
      legend: { display: false },
      datalabels: {
        anchor: 'end',
        align: 'end',
        color: theme.palette.text.primary,
        font: { weight: 'bold', size: 11 },
        formatter: (value) => value || '',
      },
      tooltip: {
        enabled: true,
      }
    },
    maintainAspectRatio: false,
    responsive: true,
    layout: {
      padding: {
        right: 20,
        left: 10,
        top: 10,
        bottom: 10
      }
    }
  };

  const handleShare = (platform) => {
    const text = `Check out my stats on SubtleSolve:\n\nPlayed: ${played}\nWin %: ${win_percent}\nCurrent Streak: ${currentStreak}\nBest Streak: ${bestStreak}\n\nTry to beat my score!`;
    const url = "https://www.subtlesolve.org";

    if (platform === 'twitter') {
      window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`, '_blank');
    } else if (navigator.share) {
      navigator.share({
        title: 'SubtleSolve Stats',
        text: text,
        url: url,
      }).catch((error) => console.log('Error sharing', error));
    } else {
      alert('Web Share API is not supported in your browser. Copy the text manually:\n\n' + text + '\n' + url);
    }
  };

  const StatItem = ({ value, label }) => (
    <Box sx={{ flex: '1 1 25%', textAlign: 'center', p: 1, minWidth: 0 }}>
      <Typography variant="h6" sx={{ fontWeight: 'bold', fontSize: { xs: '1rem', sm: '1.25rem' } }}>
        {value}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ fontSize: { xs: '0.7rem', sm: '0.875rem' } }}>
        {label}
      </Typography>
    </Box>
  );

  return (
    <Dialog 
      open={open} 
      onClose={handleClose} 
      fullWidth 
      maxWidth="sm"
      PaperProps={{ 
        style: { 
          backgroundColor: theme.palette.background.paper,
          color: theme.palette.text.primary,
        } 
      }}
    >
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', p: { xs: 2, sm: 3 } }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold', fontSize: { xs: '1.25rem', sm: '1.5rem' } }}>
          SubtleSolve Stats
        </Typography>
        
        <Card elevation={3} sx={{ width: '100%', mb: 2, backgroundColor: theme.palette.background.default }}>
          <CardContent sx={{ 
            display: 'flex', 
            justifyContent: 'space-around', 
            flexWrap: 'nowrap', 
            p: { xs: 1, sm: 2 },
            '&:last-child': { pb: { xs: 1, sm: 2 } }
          }}>
            <StatItem value={played} label="Played" />
            <StatItem value={win_percent} label="Win %" />
            <StatItem value={currentStreak} label="Current Streak" />
            <StatItem value={bestStreak} label="Max Streak" />
          </CardContent>
        </Card>

        <Card elevation={3} sx={{ 
          width: '100%', 
          mb: 2, 
          backgroundColor: theme.palette.background.default,
          overflow: 'hidden'
        }}>
          <CardContent sx={{ 
            p: { xs: 1, sm: 2 },
            '&:last-child': { pb: { xs: 1, sm: 2 } },
            height: { xs: 240, sm: 280 },
            position: 'relative'
          }}>
            <Box sx={{ height: '100%', width: '100%' }}>
              <Bar data={chartData} options={options} />
            </Box>
          </CardContent>
        </Card>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap', width: '100%' }}>
          <Button 
            variant="contained" 
            onClick={() => handleShare('web')} 
            startIcon={<ShareIcon />}
            fullWidth={isMobile}
            sx={{ minWidth: isMobile ? 'auto' : 120 }}
          >
            Share
          </Button>
          <Button 
            variant="contained" 
            onClick={() => handleShare('twitter')} 
            startIcon={<TwitterIcon />}
            fullWidth={isMobile}
            sx={{ 
              backgroundColor: '#1DA1F2', 
              '&:hover': { backgroundColor: '#1a91da' },
              minWidth: isMobile ? 'auto' : 120
            }}
          >
            Share on X
          </Button>
        </Box>
      </DialogContent>
    </Dialog>
  );
}