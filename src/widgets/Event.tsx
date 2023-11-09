import React, { useMemo, useState } from 'react';
import { Grid, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import { Main } from '../constants/drawerStyles';
import { useAppSelector } from '../hooks';
import { useSearchEventsQuery } from '../store/endpoint/event';
import { debounce } from 'lodash';
import { TableWidget } from './Table';
import { debounceTime } from '../constants/constants';
import { Spinner } from '@material-tailwind/react';
import { SearchBar } from './SearchBar';



function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


function DisplayEmptyTable({ label }: { label: string }) {
    return (
        <>
            <TableContainer sx={{ maxHeight: 440 }}>
                <Table stickyHeader size="medium" sx={{
                    display: 'flex-col', alignItems: 'center', justifyContent: 'center', maxHeight: '200px'
                }} >
                    <TableBody>
                        <TableRow>
                            <TableCell align='center'>
                                {label}
                            </TableCell>
                        </TableRow>
                    </TableBody>
                </Table >
            </TableContainer>
        </>
    )
}



function EventsWidget() {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('');
    const debouncedSearch = useMemo(() => debounce((value) => {
        setDebouncedSearchTerm(value);
    }, debounceTime), [])

    const { data: allData, isSuccess, isLoading, isError } = useSearchEventsQuery(debouncedSearchTerm);

    if (isSuccess && allData.length !== 0) {
        const handleDebounce = (value: string) => {
            debouncedSearch(value)
        }
        const searchOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
            setSearchTerm(e.target.value)
            handleDebounce(e.target.value)
        }

        const clearTextField = () => {
            debouncedSearch('')
            setSearchTerm('')
        }
        return <>
            <SearchBar
                searchTerm={searchTerm}
                searchOnChange={searchOnChange}
                clearTextField={clearTextField}
            />
            <TableWidget data={allData} />
        </>


    } else if (isSuccess && allData.length === 0) {
        return (
            <>
                <SearchBar
                    searchTerm={searchTerm}
                    searchOnChange={(e) => setSearchTerm(e.target.value)}
                    clearTextField={() => setSearchTerm('')}
                />
                <DisplayEmptyTable label={'No data found. Empty table'} />
            </>
        )
    }

    else if (isError) {
        return (
            <>
                <SearchBar
                    searchTerm={searchTerm}
                    searchOnChange={(e) => setSearchTerm(e.target.value)}
                    clearTextField={() => setSearchTerm('')}
                />
                <DisplayEmptyTable label={'An error as has occured when trying to fetch data'} />
            </>
        )
    }

    else if (isLoading) {
        return (
            <Spinner />
        )
    }

}

export default function Events() {
    const drawerState = useAppSelector((state) => state.eventReducer.drawerState)
    return (
        <Main open={drawerState} sx={{ py: 10 }}>
            <Grid item xs={12} sx={{ mb: 5 }} >
                <Paper sx={{ p: 2, display: 'flex', flexDirection: 'column', backgroundColor: (theme) => theme.palette.grey[200], borderRadius: (theme) => theme.spacing(2), overflow: 'hidden' }}>
                    <EventsWidget />
                </Paper>
            </Grid>
            <Copyright />
        </Main >
    );
}

