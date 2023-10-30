import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Drawer from '@mui/material/Drawer';
import CssBaseline from '@mui/material/CssBaseline';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { ListItem, ListItemButton, ListItemIcon, ListItemText, useTheme } from '@mui/material';
import { setDrawerState, setDrawerText } from '../store/slice/celebrations';
import { useAppDispatch, useAppSelector } from '../hooks'
import { AppBar, DrawerHeader, drawerWidth } from '../constants/drawerStyles';
import UpcomingCelebrations from './Celebrations';
import { Route, useNavigate, Routes } from 'react-router-dom';
import { RoutePaths } from '../constants/routes';
import CelebrationForm from './CelebrationForm';


function DrawerOptionsHeader() {
    const theme = useTheme();
    const dispatch = useAppDispatch();
    return (
        < DrawerHeader >
            <IconButton onClick={() => dispatch(setDrawerState(false))}>
                {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
            </IconButton>
        </DrawerHeader >
    )
}


type RouteTypes = {
    name: string,
    path: string,
}
function DrawerOptions() {
    const dispatch = useAppDispatch()
    const navigate = useNavigate()

    const listItems: RouteTypes[] = [
        {
            name: 'Celebrations',
            path: RoutePaths.Events
        },
        {
            name: 'Add Celebration',
            path: RoutePaths.AddEvents
        },
    ]

    const handleClick = ({ name, path }: RouteTypes) => {
        dispatch(setDrawerText(name))
        navigate(path)
    }
    return (
        <List>
            {listItems.map((text, index) => (
                <ListItem key={index}>
                    <ListItemButton onClick={() => handleClick({ name: text.name, path: text.path })}>
                        <ListItemIcon>
                            {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                        </ListItemIcon>
                        <ListItemText primary={text.name} />
                    </ListItemButton>
                </ListItem>
            ))}
        </List >
    )
}


type AppBarHeader = {
    title: string,
    state: boolean
}
function AppBarHeader({ title, state }: AppBarHeader) {
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
                <Typography variant="h6" noWrap component="div">
                    {title}
                </Typography>
            </Toolbar>
        </AppBar>
    )
}

function AppRoutes() {
    return (
        <Routes>
            <Route path={RoutePaths.default} Component={UpcomingCelebrations} />
            <Route path={RoutePaths.Events} Component={UpcomingCelebrations} />
            <Route path={RoutePaths.AddEvents} Component={CelebrationForm} />
        </Routes>
    )
}

export default function MainPageDrawer() {
    const drawerState = useAppSelector((state) => state.celebrationReducer.drawerState)
    const toolbarTitle = useAppSelector((state) => state.celebrationReducer.currentSelectedDrawer)

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBarHeader title={toolbarTitle} state={drawerState} />
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
            <AppRoutes />
        </Box >
    );
}

