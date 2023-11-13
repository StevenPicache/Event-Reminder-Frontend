import React, { useEffect, useState } from 'react'
import { GetEvents } from '../types/event'
import {
    Box,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableFooter,
    TableHead,
    TablePagination,
    TableRow,
    TableSortLabel,
    Typography,
} from '@mui/material'
import { convertToLocaleDate } from '../helper/convertUtcToLocale'

type TableProps = {
    data: GetEvents[]
}

type TableHeaderProps = {
    asc: boolean
    onClickHandler: React.MouseEventHandler<HTMLSpanElement>
}

function TableHeaderWidget(props: TableHeaderProps) {
    const { asc, onClickHandler } = props
    return (
        <TableHead>
            <TableRow>
                <TableCell
                    sx={{
                        backgroundColor: (theme) => theme.palette.grey[200],
                    }}
                >
                    <Typography>{'Name'}</Typography>
                </TableCell>

                <TableCell
                    align="center"
                    sx={{
                        backgroundColor: (theme) => theme.palette.grey[200],
                    }}
                >
                    <TableSortLabel
                        direction={asc ? 'asc' : 'desc'}
                        onClick={onClickHandler}
                    >
                        <Typography>{'Date'}</Typography>
                    </TableSortLabel>
                </TableCell>

                <TableCell
                    align="right"
                    sx={{
                        backgroundColor: (theme) => theme.palette.grey[200],
                    }}
                >
                    <TableSortLabel direction={asc ? 'asc' : 'desc'}>
                        <Typography>{'Event name'}</Typography>
                    </TableSortLabel>
                </TableCell>
            </TableRow>
        </TableHead>
    )
}

type TableBodyProps = {
    data: GetEvents[]
}

function TableBodyWidget(props: TableBodyProps) {
    const { data } = props
    return (
        <TableBody>
            {data.map((row, index) => (
                <TableRow
                    hover
                    key={index}
                    sx={{
                        backgroundColor: (theme) =>
                            index % 2 === 0
                                ? theme.palette.grey[300]
                                : theme.palette.grey[200],
                    }}
                >
                    <TableCell>{row.name}</TableCell>
                    <TableCell align="center">{`${convertToLocaleDate({
                        date: row.eventDate,
                    })} `}</TableCell>
                    <TableCell align="right">
                        {row.eventType ?? 'N/A'}
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    )
}

type TableFooterProps = {
    data: GetEvents[]
    rowsPerPage: number
    pageNum: number
    onPageChange: (e: unknown, newPage: number) => void
    onRowsPerPageChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}
function TableFooterWidget(props: TableFooterProps) {
    const { data, rowsPerPage, pageNum, onPageChange, onRowsPerPageChange } =
        props
    const pageOptions = [1, 3, 5, { label: 'All', value: -1 }]

    return (
        <TableFooter>
            <TablePagination
                rowsPerPage={rowsPerPage}
                rowsPerPageOptions={pageOptions}
                count={data.length}
                page={pageNum}
                onPageChange={onPageChange}
                onRowsPerPageChange={onRowsPerPageChange}
            />
        </TableFooter>
    )
}

function MainTable(props: TableProps) {
    const [asc, setAsc] = useState<boolean>(false)
    const [data, setData] = useState<GetEvents[]>(props.data)
    const [pageNum, setPageNum] = useState<number>(0)
    const [rowsPerPage, setRowsPerPage] = useState<number>(5)

    const onClickHandler = (sortBirthDate = true) => {
        const sortDates = [...props.data]
        sortDates.sort((a, b) => {
            const dateA = new Date(sortBirthDate ? a.eventDate : a.eventDate)
            const dateB = new Date(sortBirthDate ? b.eventDate : b.eventDate)
            return asc
                ? dateA.getTime() - dateB.getTime()
                : dateB.getTime() - dateA.getTime()
        })
        setAsc(!asc)
        setData(sortDates)
    }

    const onNumberOfPageChange = (e: unknown, newPage: number) => {
        setPageNum(newPage)
    }

    const handleOnRowsPerPageChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        setRowsPerPage(+event.target.value)
        setPageNum(0)
    }

    useEffect(() => {
        setData(props.data)
    }, [props.data])

    const newData =
        rowsPerPage > 0
            ? data.slice(
                  pageNum * rowsPerPage,
                  pageNum * rowsPerPage + rowsPerPage,
              )
            : data

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
                <TableHeaderWidget
                    asc={asc}
                    onClickHandler={() => onClickHandler(false)}
                />
                <TableBodyWidget data={newData} />
                <TableFooterWidget
                    data={data}
                    rowsPerPage={rowsPerPage}
                    pageNum={pageNum}
                    onPageChange={onNumberOfPageChange}
                    onRowsPerPageChange={handleOnRowsPerPageChange}
                />
            </Table>
        </TableContainer>
    )
}

export function TableWidget(props: TableProps) {
    const { data } = props
    return (
        <Box
            sx={{
                border: 1,
                borderRadius: '10px',
                overflow: 'auto',
                mt: 2,
            }}
        >
            <MainTable data={data} />
        </Box>
    )
}
