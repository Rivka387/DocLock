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
            </Menu>
        </Box>
        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            <Button sx={{ color: "#FFFFFF" }} component={Link} to='/upload'>UPLOAD</Button>
            <Button sx={{ color: "#FFFFFF" }} component={Link} to='/filelist'>filelist</Button>
            <Button sx={{ color: "#FFFFFF" }} component={Link} to='/view-file'>view-file</Button>
        </Box>
    </>);
};

export default NavBar;