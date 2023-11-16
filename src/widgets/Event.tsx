import React, { useMemo, useState } from 'react'
import {
    Box,
    Grid,
    Paper,
    SelectChangeEvent,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Typography,
} from '@mui/material'
import { Main } from '../constants/drawerStyles'
import { useAppSelector } from '../hooks'
import {
    useWeekRangeEventsQuery,
    useSearchEventsQuery,
} from '../store/endpoint/event'
import { debounce } from 'lodash'
import { TableWidget } from './Table'
import { debounceTime } from '../constants/constants'
import { SearchBar } from './SearchBar'
import SelectDropDown from '../common/select_dropdown'

function Copyright() {
    return (
        <Typography variant="body2" color="text.secondary" align="center">
            {'Copyright © '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    )
}

function DisplayEmptyTable({ label }: { label: string }) {
    return (
        <TableContainer sx={{ maxHeight: 440 }}>
            <Table
                stickyHeader
                size="medium"
                sx={{
                    display: 'flex-col',
                    alignItems: 'center',
                    justifyContent: 'center',
                    maxHeight: '200px',
                }}
            >
                <TableBody>
                    <TableRow>
                        <TableCell align="center">{label}</TableCell>
                    </TableRow>
                </TableBody>
            </Table>
        </TableContainer>
    )
}

function EventsWidget() {
    const dropDownOptions = [
        'None',
        '2 weeks',
        '4 weeks',
        '8 weeks',
        '16 weeks',
    ]
    const SET_TO_EMPTY = ''
    let tableContent = null

    const [searchTerm, setSearchTerm] = useState<string>('')
    const [disableSearchBar, setDisableSearchBar] = useState<boolean>(false)
    const [weekRange, setWeekRange] = useState<string>('')
    const [debouncedSearchTerm, setDebouncedSearchTerm] = useState<string>('')
    const debouncedSearch = useMemo(
        () =>
            debounce((value) => {
                setDebouncedSearchTerm(value)
            }, debounceTime),
        [],
    )

    const handleDebounce = (value: string) => {
        debouncedSearch(value)
    }

    const { data: allData = [], isError: allDataError } =
        useSearchEventsQuery(debouncedSearchTerm)

    const { data: weekRangeData = [], isError: weekRangeError } =
        useWeekRangeEventsQuery(parseInt(weekRange))

    const handleWeekChange = (e: SelectChangeEvent<string>) => {
        setWeekRange(e.target.value)
        if (e.target.value === 'None') {
            setDisableSearchBar(false)
            setWeekRange(SET_TO_EMPTY)
        } else {
            clearTextField()
            setDisableSearchBar(true)
        }
    }

    const searchOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
        handleDebounce(e.target.value)
    }

    const clearTextField = () => {
        debouncedSearch('')
        setSearchTerm('')
    }

    const tableData = weekRangeData.length !== 0 ? weekRangeData : allData

    if (allDataError || weekRangeError) {
        tableContent = (
            <DisplayEmptyTable
                label={'An error as has occured when trying to fetch data'}
            />
        )
    } else {
        if (tableData.length > 0) {
            tableContent = <TableWidget data={tableData} />
        } else {
            tableContent = <DisplayEmptyTable label={'No data found '} />
        }
    }

    return (
        <>
            <Box
                sx={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                }}
            >
                <Box sx={{ width: '70%', mr: 2 }}>
                    <SearchBar
                        searchTerm={searchTerm}
                        disable={disableSearchBar}
                        searchOnChange={searchOnChange}
                        clearTextField={clearTextField}
                    />
                </Box>

                <Box sx={{ width: '30%' }}>
                    <SelectDropDown
                        options={dropDownOptions}
                        selectValue={weekRange}
                        selectOnChange={handleWeekChange}
                        selectLabel="Select week range"
                    />
                </Box>
            </Box>
            {tableContent}
        </>
    )
}

export default function Events() {
    const drawerState = useAppSelector(
        (state) => state.eventReducer.drawerState,
    )
    return (
        <Main open={drawerState} sx={{ py: 10 }}>
            <Grid item xs={12} sx={{ mb: 5 }}>
                <Paper
                    sx={{
                        p: 2,
                        display: 'flex',
                        flexDirection: 'column',
                        backgroundColor: (theme) => theme.palette.grey[200],
                        borderRadius: (theme) => theme.spacing(2),
                        overflow: 'hidden',
                    }}
                >
                    <EventsWidget />
                </Paper>
            </Grid>
            <Copyright />
        </Main>
    )
}
