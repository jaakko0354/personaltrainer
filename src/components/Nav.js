import React from "react";
import { AppBar, Toolbar, Typography,IconButton, Button, Menu,MenuItem} from "@mui/material";
import MenuIcon from '@mui/icons-material/Menu';
import Customerlist from "./Customerlist";
import Traininglist from "./Traininglist";
import CalendarPage from "./Calendarpage";
import Chart from "./Charts";


export default function Nav() {
const [openMenu, setOpenMenu] = React.useState(false);
const [openCustomerList, setOpenCustomerList] = React.useState(true);
const [openTrainingList, setOpenTrainingList] = React.useState(false);
const [openCalendarPage, setOpenCalendarPage] = React.useState(false);
const [openChartPage, setOpenChartPage] = React.useState(false);

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
    if (openCalendarPage) {
        setOpenCalendarPage(false);
    }
    if(openChartPage){
        setOpenChartPage(false)
    }
    setOpenMenu(false);
}

const handleClickTrainingList = () => {
    setOpenTrainingList(!openTrainingList);
    if (openCustomerList) {
        setOpenCustomerList(false);
    }
    if (openCalendarPage) {
        setOpenCalendarPage(false);
    }
    if(openChartPage){
        setOpenChartPage(false)
    }
    setOpenMenu(false);
}
const handleClickCalendar = () => {
    setOpenCalendarPage(!openCalendarPage);
    if(openCustomerList) {
        setOpenCustomerList(false)
    }
    if(openTrainingList){
        setOpenTrainingList(false)
    }
    if(openChartPage){
        setOpenChartPage(false)
    }
    setOpenMenu(false)
}
const handleClickChart = () => {
    setOpenChartPage(!openChartPage);
    if(openCustomerList) {
        setOpenCustomerList(false)
    }
    if(openTrainingList){
        setOpenTrainingList(false)
    }
    if (openCalendarPage) {
        setOpenCalendarPage(false);
    }
    setOpenMenu(false)
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
            <MenuItem onClick={handleClickCalendar}>Calendar</MenuItem>
            <MenuItem onClick={handleClickChart}>Statistic</MenuItem>
            </Menu>
        </Toolbar>
    </AppBar>
    {openCustomerList && <Customerlist />}
    {openTrainingList && <Traininglist />}
    {openCalendarPage && <CalendarPage />}
    {openChartPage && <Chart />}
</div>
);
}