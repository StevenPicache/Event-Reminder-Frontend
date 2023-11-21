import * as React from 'react'
import Box from '@mui/material/Box'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import dayjs, { Dayjs } from 'dayjs'
import { PickerChangeHandlerContext } from '@mui/x-date-pickers/internals/hooks/usePicker/usePickerValue.types'
import { DateValidationError, FieldSelectedSections } from '@mui/x-date-pickers'

type DatePickerProps = {
    dateError: boolean
    value?: Date | null
    onChangeSelection?: (newValue: FieldSelectedSections) => void
    onChangeDate?: (
        value: Dayjs | null,
        context: PickerChangeHandlerContext<DateValidationError>,
    ) => void
}

function DatePickerWidget(props: DatePickerProps) {
    const { dateError, value, onChangeDate, onChangeSelection } = props
    return (
        <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Box
                width={'100%'}
                sx={{
                    border: dateError ? 1 : 0,
                    borderColor: dateError ? 'red' : '',
                }}
            >
                <DatePicker
                    label="Date"
                    sx={{
                        backgroundColor: (theme) => theme.palette.grey[200],
                        width: '100%',
                    }}
                    format="MM-D-YYYY"
                    value={value ? dayjs(value) : null}
                    onChange={onChangeDate}
                    onSelectedSectionsChange={onChangeSelection}
                />
            </Box>
        </LocalizationProvider>
    )
}

export default DatePickerWidget
