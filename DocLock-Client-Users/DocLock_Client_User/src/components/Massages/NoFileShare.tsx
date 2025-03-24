import { Security } from "@mui/icons-material"
import { Box, Typography } from "@mui/material"

function NoFileShare() {
  return (
    <Box 
      sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', height: '70vh', backgroundColor: '#f4f6f8', padding: 3, borderRadius: 2, boxShadow: 2, textAlign: 'center',
      }}
    >
      <Security sx={{ fontSize: 50, color: 'primary.main', marginBottom: 2 }} />
      <Typography variant="h5" sx={{ marginBottom: 2 }}>
      No files to share has been done yet.
      </Typography>
     
   
      
    </Box>
  )
}

export default NoFileShare