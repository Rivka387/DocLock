import { Box, Typography, Button } from '@mui/material';
import { Security, Upload } from '@mui/icons-material';

export default function Nofile() {
  return (
    <Box 
      sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '70vh', backgroundColor: '#f4f6f8', padding: 3, borderRadius: 2, boxShadow: 2, textAlign: 'center',
      }}
    >
      <Security sx={{ fontSize: 50, color: 'primary.main', marginBottom: 2 }} />
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
      You don't have any files yet.
      </Typography>
      <Typography variant="body1" sx={{ marginBottom: 3, color: 'text.secondary' }}>
      Add secure files to save, view, and share reliably and securely.
      </Typography>
      <Button 
        variant="contained" 
        color="primary" 
        startIcon={<Upload />} 
        href="/upload"
        sx={{ textTransform: 'none', borderRadius: 1, paddingX: 3, paddingY: 1.5,
        }}
      >
        Upload File      </Button>
    </Box>
  );
}
