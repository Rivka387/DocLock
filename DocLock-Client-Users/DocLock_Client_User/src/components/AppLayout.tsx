import { AppBar, Box, Container, IconButton, Menu, MenuItem, Toolbar, Tooltip, Typography } from "@mui/material";
import { Outlet, useNavigate } from "react-router";
import NavBar from "./NavBar";
import { Spa } from "@mui/icons-material";
import logo from "../assets/loggo.png";
import UserDetails from "./User pages/UserDetails";
import React from "react";
import userStore from "./User pages/userStore";
export default function appLayout() {
  const navigate = useNavigate();
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
};
const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
};
  return (
    <>
     <AppBar>

<Container maxWidth="xl">
        {/* <Toolbar disableGutters> */}
        <Toolbar>
        <img
          src={logo}
          alt="DocLock Logo"
          style={{ height: "55px", marginRight: "5px" }}
        />
        <Typography variant="h4"  fontFamily="cursive"align="left"  marginLeft="10px" sx={{ flexGrow: 1 }}>
        DocLock
        </Typography>  
       {userStore.getUserId()&& <NavBar /> }              
            
       <Box sx={{ flexGrow: 0, display:'flex',}}>
                    
                    <Tooltip title="Open settings">
                        <IconButton onClick={handleOpenUserMenu}>
                           <UserDetails />
                        </IconButton>
                    </Tooltip>
                    <Menu sx={{ mt: '45px' }} id="menu-appbar" anchorEl={anchorElUser}
                            anchorOrigin={{ vertical: 'top', horizontal: 'right',}}
                            keepMounted transformOrigin={{ vertical: 'top', horizontal: 'right',}}
                            open={Boolean(anchorElUser)} onClose={handleCloseUserMenu}>
                        <MenuItem onClick={handleCloseUserMenu}>
                            <Typography onClick={() => {
                              userStore.logout();
                              navigate('/login');
                            }}>Log Out</Typography>
                        </MenuItem>
                    </Menu>
                </Box>
            
        
        
    </Toolbar>
</Container>
</AppBar > 

<Box component="div" sx={{ minHeight: 'calc(100vh - 64px - 200px)', paddingTop: '50px', overflowX: 'hidden', width: '100%' ,paddingBottom:'20px'}}>
        <Outlet/>
            </Box>
                </>
  )
}
