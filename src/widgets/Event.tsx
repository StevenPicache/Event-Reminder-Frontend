import React, { useMemo, useState } from 'react';
import { Grid, Paper, Typography } from '@mui/material';
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

function EventsWidget() {
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('');
    const debouncedSearch = useMemo(() => debounce((value) => {
        setDebouncedSearchTerm(value);
    }, debounceTime), [])

    const { data: allData, isSuccess, isLoading, isError } = useSearchEventsQuery(debouncedSearchTerm);

    if (isSuccess) {
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

        return (
            <>
                <SearchBar
                    searchTerm={searchTerm}
                    searchOnChange={searchOnChange}
                    clearTextField={clearTextField}
                />
                <TableWidget data={allData} />
            </>
        )
    } else if (isLoading) {
        return (
            <Spinner />
        )
    }

    else if (isError) {
        /// TODO: Add proper error message
        console.error('Error', isError)
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

