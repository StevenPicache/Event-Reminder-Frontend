import * as React from 'react'
import { useState } from 'react'
import Box from '@mui/material/Box'
import TextField from '@mui/material/TextField'
import {
    Avatar,
    Container,
    Menu,
    MenuItem,
    Paper,
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
        value,
        errorValue,
        onChangeText,
        onChangeError,
    } = props
    return (
        <TextField
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

/// TODO: Add drop down of event types

function AddEventWidget() {
    const [addCelebration, { isError }] = useAddEventsMutation()

    const [first_name, setFirstName] = useState<string>('')
    const [last_name, setLastName] = useState<string>('')
    const [event_type, setEventType] = useState<string>('')
    const [date, setDate] = useState<dayjs.Dayjs | null>(null)

    const [firstNameError, setFirstNameError] = useState<boolean>(false)
    const [lastNameError, setLastNameError] = useState<boolean>(false)
    const [eventTypeError, setEventTypeError] = useState<boolean>(false)
    const [dateError, setDateError] = useState<boolean>(false)

    const [error, setError] = useState<string>('')

    const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            if (first_name && last_name && event_type && date != null) {
                const data: PostEvents = {
                    firstName: first_name,
                    lastName: last_name,
                    eventType: event_type,
                    eventDate: date.toDate(),
                }
                await addCelebration(data).unwrap()
                clearFields()
                clearErrors()
            } else {
                setErrorState()
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (e: any) {
            /// TODO / TECH DEBT: Handle error properly without using type any
            setError(e.error)
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

        if (event_type.length === 0) {
            setEventTypeError(true)
        }
        if (date === null) {
            setDateError(true)
        }
    }

    const clearFields = () => {
        setFirstName('')
        setLastName('')
        setEventType('')
        setDate(null)
    }

    const clearErrors = () => {
        setFirstNameError(false)
        setLastNameError(false)
        setEventTypeError(false)
        setDateError(false)
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

                        <Grid item xs={12}>
                            <TextFieldWidget
                                id="event-type"
                                name="eventType"
                                label="Event Type"
                                value={event_type}
                                errorValue={eventTypeError}
                                onChangeText={(e) =>
                                    setEventType(e.target.value)
                                }
                                onChangeError={() => setEventTypeError(false)}
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
