import { Divider, List, ListItem, ListItemButton, ListItemIcon, ListItemText, Toolbar } from "@mui/material";
import React from "react";
import MailIcon from '@mui/icons-material/Mail';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import { Box } from "@mui/system";
import AccountTreeIcon from '@mui/icons-material/AccountTree';
import DashboardIcon from '@mui/icons-material/Dashboard';
import GridViewIcon from '@mui/icons-material/GridView';
import './Drawer.css'
const Drawer = () => {
    return <div>
        <Box className="drawer_heading">
            <AccountTreeIcon className="drawer_logo" /> GEAR
        </Box>
        <List>
            {['Create Desk',].map((text, index) => (
                <ListItem key={text} disablePadding className="list_item">
                    <ListItemButton className="list_item_btn">
                        <ListItemIcon>
                            {index % 2 === 0 ? <DashboardIcon /> : <GridViewIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text} />
                    </ListItemButton>
                </ListItem>
            ))}
        </List>
    </div>;
};

export default Drawer;
