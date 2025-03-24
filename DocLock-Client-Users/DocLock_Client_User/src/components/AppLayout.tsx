import { AppBar, Box, Container, Toolbar, Typography } from "@mui/material";
import NavBar from "./NavBar";
import logo from "../assets/‏‏logo.png";
import { Outlet } from "react-router";

export default function AppLayout() {
  return (
    <>
      <AppBar
        sx={{
          backgroundColor: '#ffffff', // Clean and minimal white background
          boxShadow: '0px 4px 6px rgba(0, 0, 0, 0.1)', // Light, subtle shadow for depth
          padding: '10px 0', // Padding for a comfortable layout
        }}
      >
        <Container maxWidth="xl">
          <Toolbar
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              padding: '0 20px',
            }}
          >
            {/* Logo */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <img
                src={logo}
                alt="DocLock Logo"
                style={{ height: "50px", marginRight: "20px" }}
              />
              <Typography
                variant="h6"
                sx={{
                  fontFamily: 'Roboto, sans-serif', // Clean sans-serif font
                  fontWeight: 600,
                  color: '#333333', // Subtle dark grey text
                  letterSpacing: '.1rem',
                  textTransform: 'uppercase', // Slight uppercase for sophistication
                }}
              >
                DocLock
              </Typography>
            </Box>

            {/* Navbar */}
            <NavBar />
          </Toolbar>
        </Container>
      </AppBar>

      {/* Content Container */}
      <Box
        component="div"
        sx={{
          minHeight: 'calc(100vh - 64px)', // Ensure content adjusts to full height
          paddingTop: '40px', // Spacing from top for content
          paddingBottom: '20px', // Padding at the bottom
          overflowX: 'hidden', // Prevent horizontal scroll
          width: '100%',
          backgroundColor: '#f4f6f9', // Light background color for a clean look
        }}
      >
        <Outlet />
      </Box>
    </>
  );
}
