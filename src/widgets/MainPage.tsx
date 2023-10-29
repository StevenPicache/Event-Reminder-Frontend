import * as React from 'react';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Link from '@mui/material/Link';
import UpcomingCelebrations from './UpcomingCelebration';
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
import { AppBar, DrawerHeader, Main, drawerWidth } from '../constants/drawerStyles';



function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                Your Website
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}



function Celebration() {
    return (
        <Grid item xs={12}>
            <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                <UpcomingCelebrations />
            </Paper>
        </Grid>
    )
}

function DrawerOptions() {
    const dispatch = useAppDispatch()
    const listItmes = ['Celebrations', 'Church Events', 'Tech Team']
    const handleClick = (text: string) => {
        dispatch(setDrawerText(text))
    }
    return (
        <>
            <List>
                {listItmes.map((text, index) => (
                    <ListItem key={text} disablePadding>
                        <ListItemButton onClick={() => handleClick(text)}>
                            <ListItemIcon>
                                {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                            </ListItemIcon>
                            <ListItemText primary={text} />
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Divider />
        </>
    )
}

function DrawerBody({ open }: { open: boolean }) {
    return (
        <Main open={open} sx={{
            backgroundColor: (theme) => theme.palette.grey[200],
            height: '100vh'
        }} >
            <DrawerHeader />
            <Box>
                <Celebration />
                <Divider sx={{ mb: 5 }} />
                <Copyright />
            </Box>
        </Main >
    )
}

function AppBarHeader({ title }: { title: string }) {
    return (
        <Typography variant="h6" noWrap component="div">
            {title}
        </Typography>
    )
}

export default function MainPageDrawer() {
    const theme = useTheme();
    const dispatch = useAppDispatch()

    const drawerState = useAppSelector((state) => state.celebrationReducer.drawerState)
    const toolbarTitle = useAppSelector((state) => state.celebrationReducer.currentSelectedDrawer)

    const handleDrawerOpen = () => {
        dispatch(setDrawerState(true))
    };

    const handleDrawerClose = () => {
        dispatch(setDrawerState(false))
    };

    return (
        <Box sx={{ display: 'flex' }}>
            <CssBaseline />
            <AppBar position="fixed" open={drawerState}>
                <Toolbar>

                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={(handleDrawerOpen)}
                        edge="start"
                        sx={{ mr: 2, ...(drawerState && { display: 'none' }) }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <AppBarHeader title={toolbarTitle} />
                </Toolbar>
            </AppBar>
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
                open={drawerState}
            >
                <DrawerHeader>
                    <IconButton onClick={handleDrawerClose}>
                        {theme.direction === 'ltr' ? <ChevronLeftIcon /> : <ChevronRightIcon />}
                    </IconButton>
                </DrawerHeader>
                <Divider />
                <DrawerOptions />
            </Drawer>

            <DrawerBody open={drawerState} />
        </Box >
    );
}
