import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { ListItem, ListItemButton, ListItemIcon, ListItemText, useTheme } from '@mui/material';
import { setDrawerState } from '../store/slice/event';
import { useAppDispatch, useAppSelector } from '../hooks'
import { AppBar, drawerWidth } from '../constants/drawerStyles';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { AddCircle, Event } from '@mui/icons-material';
import { listItems } from '../constants/constants';
import EventForm from './EventForm';
import Events from './Event';
import { RoutePaths } from '../constants/routes';



function DrawerOptionsHeader() {
    const theme = useTheme();
    const dispatch = useAppDispatch();
    return (
        <>
            <Box sx={{
                display: 'flex',
                alignItems: 'center',
                padding: theme.spacing(0, 1),
                ...theme.mixins.toolbar,
                justifyContent: 'flex-end',
            }}>
                <IconButton onClick={() => dispatch(setDrawerState(false))}>
                    {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                </IconButton>
            </Box>
        </>
    )
}


type ButtonClick = {
    path: string
}
function DrawerOptions() {
    const navigate = useNavigate()

    const handleClick = ({ path }: ButtonClick) => {
        navigate(path)
    }

    return (
        <List>
            {listItems.map((text, index) => (
                <ListItem key={index}>
                    <ListItemButton onClick={() => handleClick({ path: text.path })}>
                        <ListItemIcon sx={{ justifyContent: 'start', flex: 'wrap' }}>
                            {index % 2 === 0 ? <Event /> : <AddCircle />}
                        </ListItemIcon>
                        <ListItemText secondary={text.name} />
                    </ListItemButton>
                </ListItem>
            ))}
        </List >
    )
}


type AppBarHeader = {
    state: boolean
}
function AppBarHeader({ state }: AppBarHeader) {
    const dispatch = useAppDispatch()
    return (
        <AppBar position="fixed" open={state} >
            <Toolbar>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    onClick={() => dispatch(setDrawerState(true))}
                    edge="start"
                    sx={{ mr: 2, ...(state && { display: 'none' }) }}
                >
                    <MenuIcon />
                </IconButton>
            </Toolbar>
        </AppBar>
    )
}


export default function MainPageDrawer() {
    const drawerState = useAppSelector((state) => state.eventReducer.drawerState)
    return (
        <Box sx={{ display: 'flex', }}>
            <CssBaseline />
            <AppBarHeader state={drawerState} />
            <Drawer
                sx={{
                    width: drawerWidth,
                    flexShrink: 0,
                    '& .MuiDrawer-paper': {
                        width: drawerWidth,
                        boxSizing: 'border-box',
                    },
                }}
                variant="persistent"
                anchor="left"
                open={drawerState}>
                <DrawerOptionsHeader />
                <Divider />
                <DrawerOptions />
            </Drawer>
            <Routes>
                <Route path={RoutePaths.default} Component={Events} />
                <Route path={RoutePaths.Events} Component={Events} />
                <Route path={RoutePaths.AddEvents} Component={EventForm} />
            </Routes>
        </Box >
    );
}

