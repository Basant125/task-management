import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Drawer from '@mui/material/Drawer';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';

import DrawerComponent from '../Drawer/Drawer'
import Appbar from '../Appbar/Appbar';
import AddTask from '../AddTask/AddTask';
import Task from '../Task/Task';
import { Route, Routes } from 'react-router-dom';
import Showtask from '../ShowTask/Showtask';

const drawerWidth = 260;

function Home(props) {
    const { window } = props;
    const [open, setOpen] = React.useState(false);
    const handleOpen = (value) => setOpen(value);
    const handleClose = (value) => setOpen(value);

    const [mobileOpen, setMobileOpen] = React.useState(false);

    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };



    const container = window !== undefined ? () => window().document.body : undefined;

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <Appbar handleDrawerToggle={handleDrawerToggle} drawerWidth={drawerWidth} handleOpen={handleOpen} />
            <Box
                component="nav"
                sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
                aria-label="mailbox folders"
            >
                {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
                <Drawer
                    container={container}
                    variant="temporary"
                    open={mobileOpen}
                    onClose={handleDrawerToggle}
                    ModalProps={{
                        keepMounted: true, // Better open performance on mobile.
                    }}
                    sx={{
                        display: { xs: 'block', sm: 'none', },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: "#EAE7B1" },
                    }}
                >
                    {<DrawerComponent />}
                </Drawer>
                <Drawer
                    variant="permanent"
                    sx={{

                        display: { xs: 'none', sm: 'block', },
                        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: drawerWidth, backgroundColor: "#EAE7B1" },
                    }}
                    open
                >
                    {<DrawerComponent />}
                </Drawer>
            </Box>
            <Box
                component="main"
                sx={{ flexGrow: 1, p: 3, backgroundImage: 'url("https://images.unsplash.com/photo-1584531979583-18c5c4b25efc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=387&q=80")', height: `100vh`, width: { sm: `calc(100% - ${drawerWidth}px)` } }}
            >
                <Toolbar />
                <Toolbar />
                <Task />
            </Box>

            {/* Modal for Add Task */}
            <AddTask open={open} handleClose={handleClose} />
        </Box>
    );
}

Home.propTypes = {
    /**
     * Injected by the documentation to work in an iframe.
     * You won't need it on your project.
     */
    window: PropTypes.func,
};

export default Home;