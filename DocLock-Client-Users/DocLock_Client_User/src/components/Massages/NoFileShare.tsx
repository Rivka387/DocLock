import { Security } from "@mui/icons-material";
import { Box, Typography, Card, CardContent } from "@mui/material";

function NoFileShare() {
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
          <Typography variant="h5" sx={{ marginBottom: 2, fontWeight: 'bold', color: '#333' }}>
            No Shared Files Yet
          </Typography>
          <Typography variant="body1" sx={{ color: '#555' }}>
            You haven’t shared any files yet. Upload and share securely with others.
          </Typography>
        </CardContent>
      </Card>
    </Box>
  );
}

export default NoFileShare;
