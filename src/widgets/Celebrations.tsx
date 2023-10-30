import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useGetEventsQuery } from '../store/endpoint/celebrations';
import { Box, Divider, Grid, Paper, Typography } from '@mui/material';
import { Main } from '../constants/drawerStyles';
import { useAppSelector } from '../hooks';



/// TODO: HELPER FUNCTION AND CONVERT DATE TO A HUMAN READABLE VERSION
function TableWidget() {
    const { data } = useGetEventsQuery();
    return (
        <Table size="medium">
            <TableHead>
                <TableRow>
                    <TableCell>
                        <Typography component="h2" variant="h6" color="primary" gutterBottom>
                            {'Name'}
                        </Typography>
                    </TableCell>
                    <TableCell>
                        <Typography component="h2" variant="h6" color="primary" gutterBottom>
                            {'Birthdate'}
                        </Typography>
                    </TableCell>
                    <TableCell align="right">
                        <Typography component="h2" variant="h6" color="primary" gutterBottom>
                            {'Wedding Anniversary'}
                        </Typography>
                    </TableCell>
                </TableRow>
            </TableHead>

            <TableBody>
                {data?.map((row, index) => (
                    <TableRow key={index}>
                        <TableCell>{row.name}</TableCell>
                        <TableCell>{`${row.birthDate}`}</TableCell>
                        <TableCell align="right">{`${row.weddingAnniversary}`}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </Table>
    )
}
export default function UpcomingCelebrations() {

    const drawerState = useAppSelector((state) => state.celebrationReducer.drawerState)
    return (
        <Main open={drawerState} sx={{
            backgroundColor: (theme) => theme.palette.grey[200],
            height: '100vh',
            py: 10
        }}>
            <Grid item xs={12}>
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column' }}>
                    <Box
                        sx={{
                            overflow: 'auto',
                        }}
                    >
                        <TableWidget />
                    </Box>
                    <Divider sx={{ mb: 5 }} />
                    <Copyright />

                </Paper>
            </Grid>

        </Main >
    );
}



function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}
