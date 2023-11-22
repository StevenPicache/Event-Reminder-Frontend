import React, { useEffect, useState } from 'react'
import { EventFormData, Events } from '../types/event'
import {
    Box,
    Button,
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
import DeleteIcon from '@mui/icons-material/Delete'
import EditIcon from '@mui/icons-material/Edit'

import { convertToLocaleDate } from '../helper/convertUtcToLocale'
import { useDeleteEventMutation } from '../store/endpoint/event'
import { useNavigate } from 'react-router-dom'
import { RoutePaths } from '../constants/routes'

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
                    <Typography>{'Event name'}</Typography>
                </TableCell>

                <TableCell
                    align="right"
                    sx={{
                        backgroundColor: (theme) => theme.palette.grey[200],
                    }}
                >
                    <Typography>{'Actions'}</Typography>
                </TableCell>
            </TableRow>
        </TableHead>
    )
}

type TableBodyProps = {
    data: Events[]
    onClickEdit: (object: Events) => Promise<void>
    onClickDelete: (id: number) => Promise<void>
}

function TableBodyWidget(props: TableBodyProps) {
    const { data, onClickEdit, onClickDelete } = props

    const handleEdit = async (object: Events) => {
        await onClickEdit(object)
    }

    const handleDelete = async (id?: number) => {
        if (id) {
            await onClickDelete(id)
        }
    }

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
                    <TableCell>{`${row.firstName} ${row.lastName} `}</TableCell>
                    <TableCell align="center">{`${convertToLocaleDate({
                        date: row.eventDate,
                    })} `}</TableCell>
                    <TableCell align="right">
                        {row.eventType ?? 'N/A'}
                    </TableCell>
                    <TableCell align="right">
                        <Button
                            sx={{ mr: 1 }}
                            onClick={() => handleEdit(row)}
                            startIcon={<EditIcon />}
                        >
                            {'Edit'}
                        </Button>
                        <Button
                            onClick={() => handleDelete(row.eventId)}
                            startIcon={<DeleteIcon />}
                        >
                            {'Delete'}
                        </Button>
                    </TableCell>
                </TableRow>
            ))}
        </TableBody>
    )
}

type TableFooterProps = {
    data: Events[]
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
            <TableRow>
                <TablePagination
                    rowsPerPage={rowsPerPage}
                    rowsPerPageOptions={pageOptions}
                    count={data.length}
                    page={pageNum}
                    onPageChange={onPageChange}
                    onRowsPerPageChange={onRowsPerPageChange}
                />
            </TableRow>
        </TableFooter>
    )
}

function MainTable(props: TableDataProps) {
    const navigate = useNavigate()
    const [deleteEvent] = useDeleteEventMutation()

    const [asc, setAsc] = useState<boolean>(false)
    const [data, setData] = useState<Events[]>(props.data)
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

    const onClickEdit = async (eventObject: Events) => {
        const formData: EventFormData = {
            eventId: eventObject.eventId,
            firstName: eventObject.firstName,
            lastName: eventObject.lastName,
            eventSelectType: '',
            eventType: eventObject.eventType,
            eventDate: eventObject.eventDate,
        }
        navigate(RoutePaths.AddEvents, { state: { formData } })
    }

    const onClickDelete = async (eventId: number) => {
        await deleteEvent(eventId)
    }

    const onPageChange = (e: unknown, newPage: number) => {
        setPageNum(newPage)
    }

    const onRowsPerPageChange = (
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
                <TableBodyWidget
                    data={newData}
                    onClickEdit={onClickEdit}
                    onClickDelete={onClickDelete}
                />

                <TableFooterWidget
                    data={data}
                    rowsPerPage={rowsPerPage}
                    pageNum={pageNum}
                    onPageChange={onPageChange}
                    onRowsPerPageChange={onRowsPerPageChange}
                />
            </Table>
        </TableContainer>
    )
}

type TableDataProps = {
    data: Events[]
}

export function TableWidget(props: TableDataProps) {
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
