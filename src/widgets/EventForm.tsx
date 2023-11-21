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
import {
    useAddEventsMutation,
    useEditEventMutation,
} from '../store/endpoint/event'
import dayjs, { Dayjs } from 'dayjs'
import { EventFormData, EventFormErrorState, Events } from '../types/event'
import { PickerChangeHandlerContext } from '@mui/x-date-pickers/internals/hooks/usePicker/usePickerValue.types'
import { DateValidationError, FieldSelectedSections } from '@mui/x-date-pickers'
import SelectDropDown from '../common/select_dropdown'
import { useLocation } from 'react-router-dom'

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
    value?: Date | null
    onChangeDate?: (
        value: Dayjs | null,
        context: PickerChangeHandlerContext<DateValidationError>,
    ) => void
    onChangeSelection?: (newValue: FieldSelectedSections) => void
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

type AddEditEventProps = {
    states: EventFormData
    isEdit?: boolean
}
function AddEditEventWidget(props: AddEditEventProps) {
    const [addCelebration, { isError: addEventError }] = useAddEventsMutation()
    const [editEvent, { isError: editEventError }] = useEditEventMutation()

    const eventSelectInitState = 'None'
    const optionsList = [
        eventSelectInitState,
        'Birthday',
        'Wedding Anniversary',
        'Graduation',
    ]

    const initialStateError: EventFormErrorState = {
        firstNameError: false,
        lastNameError: false,
        eventSelectTypeError: false,
        eventTypeError: false,
        eventDateError: false,
    }

    const [eventFormData, setEventFormData] = useState<EventFormData>(
        props.states,
    )

    const [error, setError] = useState<EventFormErrorState>(initialStateError)
    const [fetchErrorMessage, setFetchErrorMessage] = useState<string>('')

    const callEndPoint = async (data: Events) => {
        console.log(data)
        try {
            if (props.isEdit) {
                await editEvent(data).unwrap()
            } else {
                await addCelebration(data).unwrap()
            }
        } catch (e: unknown) {
            console.error(e)
        }
    }

    const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            const event =
                eventFormData.eventSelectType.length === 0
                    ? eventFormData.eventType
                    : eventFormData.eventSelectType
            if (
                eventFormData.firstName &&
                eventFormData.lastName &&
                event &&
                eventFormData.eventDate != null
            ) {
                const data: Events = {
                    eventId: props.isEdit ? eventFormData.eventId : undefined,
                    firstName: eventFormData.firstName,
                    lastName: eventFormData.lastName,
                    eventType: event,
                    eventDate: eventFormData.eventDate,
                }

                callEndPoint(data)
                clearFields()
                clearErrors()
            } else {
                setErrorState()
            }
        } catch (e: unknown) {
            setFetchErrorMessage('Failed on adding the event')
            console.log(e)
        }
    }

    const setErrorState = () => {
        const eventTypeData =
            eventFormData.eventSelectType.length === 0
                ? eventFormData.eventType
                : eventFormData.eventSelectType

        if (eventFormData.firstName.length === 0) {
            error.firstNameError = true
        }

        if (eventFormData.lastName.length === 0) {
            error.lastNameError = true
        }

        if (eventFormData.eventDate === null) {
            error.eventDateError = true
        }

        if (eventTypeData.length === 0) {
            error.eventSelectTypeError = true
            error.eventTypeError = true
        }

        setError({ ...error })
    }

    const clearFields = () => {
        setEventFormData({
            firstName: '',
            lastName: '',
            eventSelectType: '',
            eventType: '',
            eventDate: null,
        })
    }

    const clearErrors = () => {
        setError(initialStateError)
    }

    const selectEventType = (e: SelectChangeEvent<string>) => {
        if (e.target.value === eventSelectInitState) {
            setEventFormData({ ...eventFormData, eventSelectType: '' })
        } else {
            setEventFormData({
                ...eventFormData,
                eventType: '',
                eventSelectType: e.target.value,
            })
        }
    }

    const disAbleEventField =
        eventFormData.eventSelectType.length === 0 ? false : true

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
                <DisplayErrorMessage
                    isError={addEventError || editEventError}
                    errorMessage={fetchErrorMessage}
                />
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
                                value={eventFormData.firstName}
                                errorValue={error.firstNameError}
                                onChangeText={(e) =>
                                    setEventFormData({
                                        ...eventFormData,
                                        firstName: e.target.value,
                                    })
                                }
                                onChangeError={() =>
                                    setError({
                                        ...error,
                                        firstNameError: false,
                                    })
                                }
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextFieldWidget
                                id="lastName"
                                name="lastName"
                                label="Last Name"
                                value={eventFormData.lastName}
                                errorValue={error.lastNameError}
                                onChangeText={(e) =>
                                    setEventFormData({
                                        ...eventFormData,
                                        lastName: e.target.value,
                                    })
                                }
                                onChangeError={() =>
                                    setError({
                                        ...error,
                                        lastNameError: false,
                                    })
                                }
                            />
                        </Grid>

                        <Grid item xs={12} sm={5}>
                            <SelectDropDown
                                options={optionsList}
                                selectLabel="Event type"
                                selectValue={eventFormData.eventSelectType}
                                errorValue={error.eventSelectTypeError}
                                selectOnChange={selectEventType}
                                selectOnClick={() =>
                                    setError({
                                        ...error,
                                        eventSelectTypeError: false,
                                        eventTypeError: false,
                                    })
                                }
                            />
                        </Grid>

                        <Grid item xs={12} sm={7}>
                            <TextFieldWidget
                                id="event-type"
                                name="eventType"
                                label="Type event name"
                                value={eventFormData.eventType}
                                errorValue={error.eventTypeError}
                                onChangeText={(e) =>
                                    setEventFormData({
                                        ...eventFormData,
                                        eventType: e.target.value,
                                    })
                                }
                                onChangeError={() =>
                                    setError({
                                        ...error,
                                        eventTypeError: false,
                                    })
                                }
                                disabled={disAbleEventField}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <DatePickerWidget
                                dateError={error.eventDateError}
                                value={eventFormData.eventDate}
                                onChangeDate={(e: Dayjs | null) =>
                                    setEventFormData({
                                        ...eventFormData,
                                        eventDate: e?.toDate() ?? null,
                                    })
                                }
                                onChangeSelection={() =>
                                    setError({
                                        ...error,
                                        eventDateError: false,
                                    })
                                }
                            />
                        </Grid>
                    </Grid>

                    <AddEventButton buttonName={'Add Event'} />
                </Box>
            </Box>
        </Container>
    )
}

export default function EventForm() {
    const location = useLocation()
    let calledFromEdit = false
    let initialStateValue: EventFormData = {
        eventId: undefined,
        firstName: '',
        lastName: '',
        eventSelectType: '',
        eventType: '',
        eventDate: null,
    }

    if (location.state !== null) {
        const { formData } = location.state
        initialStateValue = { ...formData }
        calledFromEdit = true
    }

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
                    <AddEditEventWidget
                        isEdit={calledFromEdit}
                        states={initialStateValue}
                    />
                </Box>
            </Paper>
        </Main>
    )
}
