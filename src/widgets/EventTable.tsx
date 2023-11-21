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

    let tableContent = null

    const [searchTerm, setSearchTerm] = useState<string>('')
    const [disableSearchBar, setDisableSearchBar] = useState<boolean>(false)
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

    const searchOnChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(e.target.value)
        handleDebounce(e.target.value)
    }

    const clearTextField = () => {
        debouncedSearch('')
        setSearchTerm('')
    }

    const [dropDownValue, setDropDownValue] = useState<string>('')

    const handleSelectDropDownOnChange = (e: SelectChangeEvent<string>) => {
        if (e.target.value === 'None') {
            setDisableSearchBar(false) /// coupled here
            setDropDownValue('')
        } else {
            setDropDownValue(e.target.value)
            clearTextField() /// coupled here
            setDisableSearchBar(true) /// coupled here
        }
    }

    const { data: searchBarData = [], isError: allDataError } =
        useSearchEventsQuery(debouncedSearchTerm)

    const { data: dropDownData = [], isError: weekRangeError } =
        useWeekRangeEventsQuery(parseInt(dropDownValue))

    const tableData = dropDownData.length !== 0 ? dropDownData : searchBarData

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
                        selectValue={dropDownValue}
                        selectOnChange={handleSelectDropDownOnChange}
                        selectLabel="Select week range"
                    />
                </Box>
            </Box>
            {tableContent}
        </>
    )
}

export default function EventsTable() {
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
