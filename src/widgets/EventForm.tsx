import * as React from 'react'
import { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import {
    Avatar,
    Container,
    Paper,
    SelectChangeEvent,
    Typography,
} from '@mui/material'
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider'
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import { DatePicker } from '@mui/x-date-pickers/DatePicker'
import { useAppSelector } from '../hooks'
import Button from '@mui/material/Button'
import Grid from '@mui/material/Grid'
import { Event } from '@mui/icons-material'
import { Main } from '../constants/drawerStyles'
import { useAddEventsMutation } from '../store/endpoint/event'
import dayjs, { Dayjs } from 'dayjs'
import { PostEvents } from '../types/event'
import { PickerChangeHandlerContext } from '@mui/x-date-pickers/internals/hooks/usePicker/usePickerValue.types'
import { DateValidationError, FieldSelectedSections } from '@mui/x-date-pickers'
import SelectDropDown from '../common/select_dropdown'

function FormIcon() {
    return (
        <Avatar sx={{ m: 1, bgcolor: 'primary.main' }}>
            <Event />
        </Avatar>
    )
}

type ErrorMessageProps = {
    isError: boolean
    errorMessage: string
}
function DisplayErrorMessage(props: ErrorMessageProps) {
    const { isError, errorMessage } = props
    return <Typography>{isError ? errorMessage : ''}</Typography>
}

type TextFieldProps = {
    id: string
    name: string
    label: string
    autofocus?: boolean
    disabled?: boolean
    value: string
    errorValue?: boolean
    onChangeText?: React.ChangeEventHandler<HTMLInputElement>
    onChangeError?: React.MouseEventHandler<HTMLDivElement>
}

function TextFieldWidget(props: TextFieldProps) {
    const {
        id,
        name,
        label,
        autofocus,
        disabled,
        value,
        errorValue,
        onChangeText,
        onChangeError,
    } = props
    return (
        <TextField
            disabled={disabled ?? false}
            id={id}
            name={name}
            label={label}
            autoFocus={autofocus ?? false}
            value={value}
            onChange={onChangeText}
            error={errorValue}
            onClick={onChangeError}
            required
            fullWidth
        />
    )
}

type DatePickerProps = {
    dateError: boolean
    value: dayjs.Dayjs | null
    onChangeDate?: (
        value: Dayjs | null,
        context: PickerChangeHandlerContext<DateValidationError>,
    ) => void
    onChangeSelection?: (newValue: FieldSelectedSections) => void
}
function DatePickerWidget(props: DatePickerProps) {
    const { dateError, value, onChangeDate, onChangeSelection } = props
    return (
        <Grid item xs={12}>
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
                        value={value}
                        onChange={onChangeDate}
                        onSelectedSectionsChange={onChangeSelection}
                    />
                </Box>
            </LocalizationProvider>
        </Grid>
    )
}

function AddEventButton({ buttonName }: { buttonName: string }) {
    return (
        <Button
            sx={{ mt: 5, mb: 2 }}
            fullWidth
            variant="contained"
            type="submit"
        >
            {buttonName}
        </Button>
    )
}

function AddEventWidget() {
    const [addCelebration, { isError }] = useAddEventsMutation()

    const eventSelectInitState = 'Other'
    const optionsList = [
        eventSelectInitState,
        'Birthday',
        'Wedding Anniversary',
        'Graduation',
    ]

    const [first_name, setFirstName] = useState<string>('')
    const [last_name, setLastName] = useState<string>('')
    const [event_type_select, setSelectEventType] =
        useState<string>(eventSelectInitState)
    const [event_type, setEventType] = useState<string>('')
    const [date, setDate] = useState<dayjs.Dayjs | null>(null)
    const [error, setError] = useState<string>('')

    const [firstNameError, setFirstNameError] = useState<boolean>(false)
    const [lastNameError, setLastNameError] = useState<boolean>(false)
    const [eventTypeError, setEventTypeError] = useState<boolean>(false)
    const [dateError, setDateError] = useState<boolean>(false)

    const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            const event =
                event_type_select === eventSelectInitState
                    ? event_type
                    : event_type_select
            if (first_name && last_name && event && date != null) {
                const data: PostEvents = {
                    firstName: first_name,
                    lastName: last_name,
                    eventType: event,
                    eventDate: date.toDate(),
                }
                await addCelebration(data).unwrap()
                clearFields()
                clearErrors()
            } else {
                setErrorState()
            }
        } catch (e: unknown) {
            setError('Failed on adding the event')
            console.log(e)
        }
    }

    const setErrorState = () => {
        if (first_name.length === 0) {
            setFirstNameError(true)
        }

        if (last_name.length === 0) {
            setLastNameError(true)
        }

        if (
            event_type_select === eventSelectInitState &&
            event_type.length === 0
        ) {
            setEventTypeError(true)
        }
        if (date === null) {
            setDateError(true)
        }
    }

    const clearFields = () => {
        setFirstName('')
        setLastName('')
        setSelectEventType(eventSelectInitState)
        setEventType('')
        setDate(null)
    }

    const clearErrors = () => {
        setFirstNameError(false)
        setLastNameError(false)
        setEventTypeError(false)
        setDateError(false)
    }

    const selectEventType = (e: SelectChangeEvent<string>) => {
        if (e.target.value !== eventSelectInitState) {
            setEventType('')
        }
        setSelectEventType(e.target.value)
    }

    return (
        <Container component="main" maxWidth="xs">
            <Box
                aria-label="add-celebration-form-box"
                sx={{
                    my: 5,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <DisplayErrorMessage isError={isError} errorMessage={error} />
                <FormIcon />

                <Box
                    component="form"
                    noValidate
                    sx={{ mt: 3 }}
                    onSubmit={submitForm}
                >
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextFieldWidget
                                name="firstName"
                                id="firstName"
                                label="First Name"
                                autofocus={true}
                                value={first_name}
                                errorValue={firstNameError}
                                onChangeText={(e) =>
                                    setFirstName(e.target.value)
                                }
                                onChangeError={() => setFirstNameError(false)}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextFieldWidget
                                id="lastName"
                                name="lastName"
                                label="Last Name"
                                value={last_name}
                                errorValue={lastNameError}
                                onChangeText={(e) =>
                                    setLastName(e.target.value)
                                }
                                onChangeError={() => setLastNameError(false)}
                            />
                        </Grid>

                        <Grid item xs={12} sm={5}>
                            <SelectDropDown
                                options={optionsList}
                                selectValue={event_type_select}
                                errorValue={eventTypeError}
                                selectOnChange={selectEventType}
                                selectOnClick={() => setEventTypeError(false)}
                            />
                        </Grid>

                        <Grid item xs={12} sm={7}>
                            <TextFieldWidget
                                id="event-type"
                                name="eventType"
                                label="Type event name"
                                value={event_type}
                                errorValue={eventTypeError}
                                onChangeText={(e) =>
                                    setEventType(e.target.value)
                                }
                                onChangeError={() => setEventTypeError(false)}
                                disabled={
                                    event_type_select === eventSelectInitState
                                        ? false
                                        : true
                                }
                            />
                        </Grid>

                        <DatePickerWidget
                            dateError={dateError}
                            value={date}
                            onChangeDate={(e) => setDate(e)}
                            onChangeSelection={() => setDateError(false)}
                        />
                    </Grid>

                    <AddEventButton buttonName={'Add Event'} />
                </Box>
            </Box>
        </Container>
    )
}

export default function EventForm() {
    const drawerState = useAppSelector(
        (state) => state.eventReducer.drawerState,
    )
    return (
        <Main
            open={drawerState}
            sx={{
                py: 10,
            }}
        >
            <Paper
                sx={{
                    px: 5,
                    py: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: (theme) => theme.palette.grey[200],
                    borderRadius: (theme) => theme.spacing(2),
                    overflow: 'hidden',
                }}
            >
                <Box
                    sx={{
                        overflow: 'auto',
                    }}
                >
                    <AddEventWidget />
                </Box>
            </Paper>
        </Main>
    )
}
