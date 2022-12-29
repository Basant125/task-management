import { AppBar, Button, IconButton, Toolbar } from "@mui/material";
import React from "react";
import MenuIcon from '@mui/icons-material/Menu';
import Typography from '@mui/material/Typography';
import { Box } from "@mui/system";
import './Appbar.css'

const Appbar = ({ handleDrawerToggle, drawerWidth, handleOpen }) => {
    return <AppBar
        position="fixed"
        sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            backgroundColor: "#3C6255",
            padding: "20px 0px",
            ml: { sm: `${drawerWidth}px` },
        }}
    >
        <Toolbar xs={{}} className="toolbar_flex">
            <Box className="toolbar_flex">
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerToggle}
                    sx={{ mr: 2, display: { sm: 'none' } }}
                >
                    <MenuIcon />
                </IconButton>
                <Typography variant="h6" noWrap component="div" className="appbar_heading">
                    GEAR platform
                </Typography>
            </Box>
            <Button variant="outlined" className="addTask_btn" onClick={() => handleOpen(true)}> + Add Task</Button>
        </Toolbar>
    </AppBar>;
};

export default Appbar;
