import * as React from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Card, CardContent, Paper } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { Main } from '../constants/drawerStyles';
import { useAppSelector } from '../hooks';


function CardWidget() {
    return (
        <Card elevation={3} >
            <CardContent>
                <TextField id="standard-basic" label="Full name" variant="standard" sx={{ display: 'flex', mb: 3 }} />
                <LocalizationProvider dateAdapter={AdapterDayjs} >
                    <DemoContainer components={['DatePicker', 'DatePicker']}>
                        <DatePicker label="Birthday" sx={{
                            backgroundColor: (theme) => theme.palette.grey[200],
                        }} />
                        <DatePicker label="Wedding Anniversary" sx={{
                            backgroundColor: (theme) => theme.palette.grey[200],
                        }} />

                    </DemoContainer>
                </LocalizationProvider>
            </CardContent>
        </Card>
    )
}

export default function CelebrationForm() {
    const drawerState = useAppSelector((state) => state.celebrationReducer.drawerState)
    return (
        <Main open={drawerState} sx={{
            backgroundColor: (theme) => theme.palette.grey[200],
            height: '100vh',
            py: 10,
            borderRadius: '50px'
        }}>
            <Paper sx={{ px: 5, display: 'flex', flexDirection: 'column' }}>
                <Box
                    sx={{
                        overflow: 'auto',

                    }}
                >
                    <CardWidget />
                </Box>
            </Paper>
        </Main >
    );
}

