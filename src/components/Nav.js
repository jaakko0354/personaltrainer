import React from "react";
import { AppBar, Toolbar, Typography,IconButton, Button, Menu,MenuItem} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Customerlist from "./Customerlist";
import Traininglist from "./Traininglist";


export default function Nav() {
const [openMenu, setOpenMenu] = React.useState(false);
const [openCustomerList, setOpenCustomerList] = React.useState(true);
const [openTrainingList, setOpenTrainingList] = React.useState(false);

const handleClickMenu = (event) => {
setOpenMenu(event.currentTarget);
}

const handleCloseMenu = () => {
    setOpenMenu(false);
}

const handleClickCustomerList = () => {
    setOpenCustomerList(!openCustomerList);
    if (openTrainingList) {
        setOpenTrainingList(false);
    }
    setOpenMenu(false);
}

const handleClickTrainingList = () => {
    setOpenTrainingList(!openTrainingList);
    if (openCustomerList) {
        setOpenCustomerList(false);
    }
    setOpenMenu(false);
}

return (
<div>
    <AppBar position="static" sx={{bgcolor:'#9999ff'}}>
        <Toolbar>
            <IconButton
                    edge="start"
                    color="inherit"
                    aria-label="menu"
                    onClick={handleClickMenu}
                >
            <MenuIcon />
            </IconButton>
            <Typography variant="h6" color="inherit">
            Menu
            </Typography>
            <Menu
                    id="simple-menu"
                    anchorEl={openMenu}
                    keepMounted
                    open={Boolean(openMenu)}
                    onClose={handleCloseMenu}
                >
            <MenuItem onClick={handleClickCustomerList}>Customer List</MenuItem>
            <MenuItem onClick={handleClickTrainingList}>Training List</MenuItem>
            </Menu>
        </Toolbar>
    </AppBar>
    {openCustomerList && <Customerlist />}
    {openTrainingList && <Traininglist />}
</div>
);
}