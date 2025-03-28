import React, { useState } from 'react';
import { Card, CardContent, CardHeader, Typography, List, ListItem, ListItemIcon, ListItemText, Grid, Box, IconButton } from '@mui/material';
import { Lock, VisibilityOff, Sync, Verified, Speed, Brightness4, Brightness7 } from '@mui/icons-material';
import logo from "../assets/loggo.png";

const About: React.FC = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  const handleModeToggle = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <Box sx={{ padding: 4, display: 'flex', justifyContent: 'center' }}>
      <Card
        sx={{
          maxWidth: 1100,
          width: '100%',
          borderRadius: 3,
          boxShadow: 3,
          backgroundColor: darkMode ? '#282828' : '#FFFFFF',
          color: darkMode ? '#E0E0E0' : '#333333',
        }}
      >
        <CardHeader
          title={<Typography variant="h4" fontWeight={700} color={darkMode ? '#6fa8cb' : '#70ab9f'} textAlign="center" fontFamily="Roboto, sans-serif">Secure File Management</Typography>}
          subheader={<Typography variant="h6" fontWeight={500} color={darkMode ? '#70ab9f' : '#607D8B'} textAlign="center">Efficient and Safe File Sharing</Typography>}
          action={
            <IconButton onClick={handleModeToggle} color="inherit">
              {darkMode ? <Brightness7 /> : <Brightness4 />}
            </IconButton>
          }
        />
        <CardContent>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                <img
                  src={logo}
                  alt="Company Overview"
                  style={{ width: '80%', borderRadius: '12px', boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)' }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Typography variant="h5" fontWeight={600} gutterBottom color={darkMode ? '#70ab9f' : '#455A64'}>About Our Company</Typography>
              <Typography variant="body1" color={darkMode ? '#B0BEC5' : '#424242'} paragraph>
                Our company is committed to providing a secure and reliable platform for file management and sharing.
                With cutting-edge encryption and an intuitive interface, we ensure your files remain safe, accessible, and easily shared.
              </Typography>
              <Typography variant="h6" fontWeight={600} gutterBottom color={darkMode ? '#74ad7d' : '#37474F'}>Our Core Principles</Typography>
              <List>
                <ListItem>
                  <ListItemIcon><Lock sx={{ color: '#6fa8cb' }} /></ListItemIcon>
                  <ListItemText primary={<Typography fontWeight={500} color={darkMode ? '#E0E0E0' : '#616161'}>Security - We use state-of-the-art encryption to protect your data.</Typography>} />
                </ListItem>
                <ListItem>
                  <ListItemIcon><VisibilityOff sx={{ color: '#70ab9f' }} /></ListItemIcon>
                  <ListItemText primary={<Typography fontWeight={500} color={darkMode ? '#E0E0E0' : '#616161'}>Confidentiality - Your files remain private and accessible only to authorized users.</Typography>} />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Sync sx={{ color: '#74ad7d' }} /></ListItemIcon>
                  <ListItemText primary={<Typography fontWeight={500} color={darkMode ? '#E0E0E0' : '#616161'}>Reliability - Our platform ensures uninterrupted and secure file access.</Typography>} />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Verified sx={{ color: '#6fa8cb' }} /></ListItemIcon>
                  <ListItemText primary={<Typography fontWeight={500} color={darkMode ? '#E0E0E0' : '#616161'}>Trust - We are committed to transparency and strong authentication measures.</Typography>} />
                </ListItem>
                <ListItem>
                  <ListItemIcon><Speed sx={{ color: '#70ab9f' }} /></ListItemIcon>
                  <ListItemText primary={<Typography fontWeight={500} color={darkMode ? '#E0E0E0' : '#616161'}>Efficiency - Optimized performance for fast and seamless file sharing.</Typography>} />
                </ListItem>
              </List>
              <Typography variant="h6" fontWeight={600} gutterBottom color={darkMode ? '#6fa8cb' : '#37474F'}>Cloud Security & Secure Sharing</Typography>
              <Typography variant="body1" color={darkMode ? '#B0BEC5' : '#424242'} paragraph>
                Our cloud-based platform guarantees your files are securely stored and protected with end-to-end encryption.
                We employ the latest security protocols to ensure that your documents are safe from unauthorized access.
              </Typography>
              <Typography variant="body1" color={darkMode ? '#B0BEC5' : '#424242'} paragraph>
                We use strong multi-factor authentication to verify users, ensuring that every action on our platform is secure and that your files are accessible only by trusted parties.
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default About;
