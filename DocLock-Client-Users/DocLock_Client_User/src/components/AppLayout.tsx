import { AppBar, Box, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material";
import { Outlet } from "react-router";
import NavBar from "./NavBar";
import { Spa } from "@mui/icons-material";
import logo from "../assets/‏‏logo.png";
export default function appLayout() {
  return (
    <>
     <AppBar>

<Container maxWidth="xl">
        {/* <Toolbar disableGutters> */}
        <Toolbar>
        <img
          src={logo}
          alt="Doclock Logo"
          style={{ height: "40px", marginRight: "10px" }}
        />
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
        DocLock
        </Typography>  
        <NavBar />               
            <Spa sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
            <Typography variant="h5" noWrap component="a" href="#app-bar-with-responsive-menu"
                sx={{ mr: 2, display: { xs: 'none', md: 'flex' }, flexGrow: 1, fontFamily: 'cursive', fontWeight: 700,
                    letterSpacing: '.3rem', color: 'inherit', textDecoration: 'none',
                }} > DocLock
            </Typography>
            
        
        
    </Toolbar>
</Container>
</AppBar > 

<Box component="div" sx={{ minHeight: 'calc(100vh - 64px - 200px)', paddingTop: '50px', overflowX: 'hidden', width: '100%' ,paddingBottom:'20px'}}>
        <Outlet/>
            </Box>
                </>
  )
}
