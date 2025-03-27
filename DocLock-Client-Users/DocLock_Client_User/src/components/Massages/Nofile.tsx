import { Box, Typography, Button, Card, CardContent } from '@mui/material';
import { Security, Upload } from '@mui/icons-material';

export default function Nofile() {
  return (
    <Box 
      sx={{ 
        display: 'flex', 
        flexDirection: 'column', 
        justifyContent: 'center', 
        alignItems: 'center', 
        height: '100vh', 
        backgroundColor: '#f4f6f8', 
        padding: 4, 
      }}
    >
      <Card 
        sx={{ 
          background: 'white', 
          borderRadius: 3, 
          boxShadow: 4, 
          padding: 4, 
          maxWidth: 400, 
          textAlign: 'center' 
        }}
      >
        <CardContent>
          <Security sx={{ fontSize: 60, color: '#6fa8cb', marginBottom: 2 }} />
          <Typography variant="h4" sx={{ marginBottom: 2, fontWeight: 'bold', color: '#333' }}>
            Secure Your Files
          </Typography>
          <Typography variant="body1" sx={{ marginBottom: 3, color: '#555' }}>
            Encrypt, store, and access your files with confidence and ease.
          </Typography>
          <Button 
            variant="contained" 
            sx={{ 
              backgroundColor: '#70ab9f', 
              color: 'white', 
              textTransform: 'none', 
              borderRadius: 2, 
              paddingX: 4, 
              paddingY: 1.5,
              fontWeight: 'bold',
              '&:hover': { backgroundColor: '#5c998a' }
            }}
            startIcon={<Upload />} 
            href="/upload"
          >
            Upload File
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
}
