import React from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import ShareIcon from '@mui/icons-material/Share';
import { useTheme, useMediaQuery } from '@mui/material';
import { Chart } from "react-chartjs-2";
import { Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement } from 'chart.js';
import ChartDataLabels from 'chartjs-plugin-datalabels';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, BarElement, ChartDataLabels);

export default function StatsDialogAnswer({ open, handleClose, data }) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const { score, currentStreak, bestStreak, scoreDistribution } = data;

  const chartData = {
    labels: ['0', '1', '2', '3', '4', '5'],
    datasets: [
      {
        data: scoreDistribution,
        backgroundColor: theme.palette.primary.main,
        borderColor: theme.palette.primary.dark,
        borderWidth: 1,
      },
    ],
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
      }
    },
    plugins: {
      title: {
        display: true,
        text: 'Score Distribution',
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

  const handleShare = () => {
    const text = `Check out my stats:\n\nScore: ${score}\nCurrent Streak: ${currentStreak}\nBest Streak: ${bestStreak}`;
    
    if (navigator.share) {
      navigator.share({
        title: 'My Stats',
        text: text,
      }).catch((error) => console.log('Error sharing', error));
    } else {
      navigator.clipboard.writeText(text)
        .then(() => alert('Stats copied to clipboard!'))
        .catch(() => alert('Sharing your stats!\n\n' + text));
    }
  };

  const StatItem = ({ value, label }) => (
    <Box sx={{ 
      flex: '1 1 33%', 
      textAlign: 'center', 
      p: { xs: 1, sm: 1.5 },
      minWidth: 0 
    }}>
      <Typography 
        variant="h5" 
        sx={{ 
          fontWeight: 'bold',
          fontSize: { xs: '1.5rem', sm: '2rem' },
          color: theme.palette.primary.main
        }}
      >
        {value}
      </Typography>
      <Typography 
        variant="body2" 
        color="text.secondary"
        sx={{ fontSize: { xs: '0.75rem', sm: '0.875rem' } }}
      >
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
      <DialogContent sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center',
        p: { xs: 2, sm: 3 },
        gap: 2
      }}>
        <Typography 
          variant="h5" 
          sx={{ 
            fontWeight: 'bold',
            fontSize: { xs: '1.25rem', sm: '1.5rem' },
            mb: 1
          }}
        >
          Your Statistics
        </Typography>

        {/* Stats Card */}
        <Card 
          elevation={3} 
          sx={{ 
            width: '100%',
            backgroundColor: theme.palette.background.default
          }}
        >
          <CardContent sx={{
            display: 'flex',
            justifyContent: 'space-around',
            flexWrap: 'nowrap',
            p: { xs: 1.5, sm: 2 },
            '&:last-child': { pb: { xs: 1.5, sm: 2 } }
          }}>
            <StatItem value={score} label="Score" />
            <StatItem value={currentStreak} label="Current Streak" />
            <StatItem value={bestStreak} label="Best Streak" />
          </CardContent>
        </Card>

        {/* Chart Card */}
        <Card 
          elevation={3} 
          sx={{ 
            width: '100%',
            backgroundColor: theme.palette.background.default,
            overflow: 'hidden'
          }}
        >
          <CardContent sx={{
            p: { xs: 1, sm: 2 },
            '&:last-child': { pb: { xs: 1, sm: 2 } },
            height: { xs: 240, sm: 280 },
            position: 'relative'
          }}>
            <Box sx={{ height: '100%', width: '100%' }}>
              <Chart type="bar" data={chartData} options={options} />
            </Box>
          </CardContent>
        </Card>

        {/* Share Button */}
        <Button 
          variant="contained" 
          color="primary" 
          onClick={handleShare}
          startIcon={<ShareIcon />}
          fullWidth={isMobile}
          sx={{ 
            mt: 1,
            minWidth: isMobile ? 'auto' : 150
          }}
        >
          Share Stats
        </Button>
      </DialogContent>
    </Dialog>
  );
}