import { Link } from "react-router-dom";
import { Box, Button, Menu, MenuItem } from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import React from "react";

const NavBar = () => {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    return (<>
        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <Button
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                color="inherit"
            >
                <MenuIcon sx={{ mr: 1, color: "#ED3D48", backgroundColor: "#FFFFFF" }} />
            </Button>
            <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'left' }}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
            >
                <MenuItem onClick={handleCloseNavMenu}>
                    <Button sx={{ color: "#FFFFFF" }} component={Link} to='/upload'>UPLOAD</Button>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                    <Button sx={{ color: "#FFFFFF" }} component={Link} to='/filelist'>filelist</Button>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
                    <Button sx={{ color: "#FFFFFF" }} component={Link} to='/view-file'>view-file</Button>
                </MenuItem>
                <MenuItem onClick={handleCloseNavMenu}>
            <Button sx={{ color: "#FFFFFF" }} component={Link} to='/about'>About</Button>
          </MenuItem>
          <MenuItem onClick={handleCloseNavMenu}>
            <Button sx={{ color: "#FFFFFF" }} component={Link} to='/'>Dashboard</Button>
          </MenuItem>
            </Menu>
        </Box>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, gap: 2, justifyContent: 'center' }}>
        <Button
        sx={{
            color: "#FFFFFF",
            borderRadius: "20px",
            padding: "8px 16px",
            textTransform: "none",
            fontWeight: "bold",
            backgroundColor:"#6fa8cb",
            "&:hover": {
                backgroundColor: "#74ad7d",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
            }
        }}
        component={Link}
        to='./about'
    >
        About
    </Button>
    <Button
        sx={{
            color: "#FFFFFF",
            borderRadius: "20px",
            padding: "8px 16px",
            textTransform: "none",
            fontWeight: "bold",
            backgroundColor:"#6fa8cb",
            "&:hover": {
                backgroundColor: "#74ad7d",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
            }
        }}
        component={Link}
        to='/'
    >
        Dashboard
    </Button>
    <Button 
        sx={{
            color: "#FFFFFF",
            borderRadius: "20px",
            padding: "8px 16px",
            textTransform: "none",
            fontWeight: "bold",
            backgroundColor:"#6fa8cb",
            mr: 2,
            "&:hover": {
                backgroundColor: "#74ad7d", 
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
            }
        }}
        component={Link}
        to='/upload'
    >
        UPLOAD
    </Button>
    <Button
        sx={{
            color: "#FFFFFF",
            borderRadius: "20px",
            padding: "8px 16px",
            textTransform: "none",
            fontWeight: "bold",
            backgroundColor:"#6fa8cb",
            mr: 2,
            "&:hover": {
                backgroundColor: "#74ad7d",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
            }
        }}
        component={Link}
        to='/filelist'
    >
        Filelist
    </Button>
    <Button
        sx={{
            color: "#FFFFFF",
            borderRadius: "20px",
            padding: "8px 16px",
            textTransform: "none",
            fontWeight: "bold",
            backgroundColor:"#6fa8cb",
            "&:hover": {
                backgroundColor: "#74ad7d",
                boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)"
            }
        }}
        component={Link}
        to='/view-file'
    >
        View File
    </Button>
   
</Box>
    </>);
};

export default NavBar;
