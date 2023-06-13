import * as React from 'react';
import { useState } from 'react'
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { GetEvents, useGetEventsQuery } from '../store/endpoint/event';
import { Box, CircularProgress, Grid, Paper, TableSortLabel, Typography } from '@mui/material';
import { Main } from '../constants/drawerStyles';
import { useAppSelector } from '../hooks';
import { convertToLocaleDate } from '../helper/convertUtcToLocale';


/// FEATURES    :
/// TODO        : ADD,EDIT,DELETE: Birthdate and Wedding Anniv




function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}




type PropsEvents = {
    data: GetEvents[]
}
function TableBodyWidget(props: PropsEvents) {
    const [asc, setAsc] = useState<boolean>(false)
    const [data, setData] = useState<GetEvents[]>(props.data ?? []);

    const onClickHandler = (sortBirthDate = true) => {
        const sortDates = [...props.data]
        sortDates.sort((a, b) => {
            const dateA = new Date(sortBirthDate ? a.eventDate : a.eventDate)
            const dateB = new Date(sortBirthDate ? b.eventDate : b.eventDate)
            return asc ? dateA.getTime() - dateB.getTime() : dateB.getTime() - dateA.getTime();
        });
        setAsc(!asc)
        setData(sortDates)
    }

    return (
        <>

            <TableHead>
                <TableRow>
                    <TableCell>
                        <Typography color="primary">
                            {'Name'}
                        </Typography>
                    </TableCell>

                    <TableCell align="center">
                        <TableSortLabel direction={asc ? 'asc' : 'desc'} onClick={() => onClickHandler(false)}>
                            <Typography color="primary">
                                {'Date'}
                            </Typography>
                        </TableSortLabel>
                    </TableCell>

                    <TableCell align="right">
                        <TableSortLabel direction={asc ? 'asc' : 'desc'}>
                            <Typography color="primary" >
                                {'Event name'}
                            </Typography>
                        </TableSortLabel>
                    </TableCell>
                </TableRow>
            </TableHead >


            <TableBody>
                {data?.map((row, index) => (
                    <TableRow key={index} sx={{ backgroundColor: (theme) => index % 2 === 0 ? theme.palette.grey[300] : theme.palette.grey[200] }}>
                        <TableCell >{row.name}</TableCell>
                        <TableCell align="center">{`${convertToLocaleDate({ date: row.eventDate })}`}</TableCell>
                        <TableCell align="right">{row.eventType}</TableCell>
                    </TableRow>
                ))}
            </TableBody>
        </>

    )
}


function TableWidget() {
    const { data, isSuccess } = useGetEventsQuery();
    return (
        isSuccess ?
            <Table size="medium" sx={{ display: 'flex-col', alignItems: 'center', justifyContent: 'center' }} >
                <TableBodyWidget data={data ?? []} />
            </Table>
            : <CircularProgress sx={{ display: 'flex-col', alignItems: 'center', justifyContent: 'center' }} />
    )
}


export default function UpcomingCelebrations() {
    const drawerState = useAppSelector((state) => state.eventReducer.drawerState)
    return (
        <Main open={drawerState} sx={{

            py: 10,

        }}>
            <Grid item xs={12} sx={{ mb: 5 }} >
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', backgroundColor: (theme) => theme.palette.grey[200], borderRadius: (theme) => theme.spacing(2), overflow: 'hidden' }}>
                    <Box
                        sx={{
                            overflow: 'auto',
                        }}
                    >
                        <TableWidget />
                    </Box>
                </Paper>
            </Grid>
            <Copyright />
        </Main >
    );
}

