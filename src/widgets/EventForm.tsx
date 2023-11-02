import * as React from 'react';
import { useState } from 'react';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { Avatar, Container, Paper, Typography } from '@mui/material';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs, } from '@mui/x-date-pickers/AdapterDayjs';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import { useAppSelector } from '../hooks';
import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import { Event } from '@mui/icons-material';
import { Main } from '../constants/drawerStyles';
import { PostEvents, useAddEventsMutation } from '../store/endpoint/event';
import dayjs from 'dayjs';


/// TODO: Handle form validation and error message

function AddEventWidget() {
    const [addCelebration, { isError }] = useAddEventsMutation()

    const [first_name, setFirstName] = useState<string>('');
    const [last_name, setLastName] = useState<string>('');
    const [eventName, setEventName] = useState<string>('');
    const [date, setDate] = useState<dayjs.Dayjs | null>(null);


    const [error, setError] = useState<string>('');


    const submitForm = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        try {
            if (date != null) {
                const data: PostEvents = {
                    firstName: first_name ?? '',
                    lastName: last_name ?? '',
                    eventType: eventName ?? '',
                    eventDate: date.toDate()
                }
                await addCelebration(data).unwrap()
            }
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } catch (e: any) {
            /// TODO / TECH DEBT: Handle error properly without using type any
            setError(e.error)
            console.log(e)
        }

        setFirstName('')
        setLastName('')
        setEventName('')
        setDate(null)
    }


    const handleDateChange = (date: dayjs.Dayjs | null) => {
        setDate(date);
    };

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

                <Typography>
                    {isError ? error : ''}
                </Typography>

                <Avatar sx={{ m: 1, bgcolor: 'primary.main' }} >
                    <Event />
                </Avatar>

                <Box component="form" noValidate sx={{ mt: 3 }} onSubmit={submitForm}>
                    <Grid container spacing={2}>
                        <Grid item xs={12} sm={6}>
                            <TextField
                                name="firstName"
                                required
                                fullWidth
                                id="firstName"
                                label="First Name"
                                autoFocus
                                autoComplete="given-name"
                                value={first_name}
                                onChange={(e) => setFirstName(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12} sm={6}>
                            <TextField
                                required
                                fullWidth
                                id="lastName"
                                label="Last Name"
                                name="lastName"
                                autoComplete="family-name"
                                value={last_name}
                                onChange={(e) => setLastName(e.target.value)}
                            />

                        </Grid>

                        <Grid item xs={12}>
                            <TextField
                                required
                                fullWidth
                                id="event-type"
                                label="Event Type"
                                name="eventType"
                                value={eventName}
                                onChange={(e) => setEventName(e.target.value)}
                            />
                        </Grid>

                        <Grid item xs={12}>
                            <LocalizationProvider dateAdapter={AdapterDayjs}>
                                <DemoContainer components={['DatePicker']}>
                                    <DatePicker
                                        label="Date"
                                        sx={{ backgroundColor: (theme) => theme.palette.grey[200] }}
                                        format='MM-D-YYYY'
                                        value={date}
                                        onChange={handleDateChange}
                                    />
                                </DemoContainer>
                            </LocalizationProvider>
                        </Grid>

                    </Grid>
                    <Button
                        sx={{ mt: 5, mb: 2 }}
                        fullWidth
                        variant="contained"
                        type='submit'
                    >
                        Add Event
                    </Button>

                </Box>
            </Box>
        </Container >
    )
}

export default function EventForm() {
    const drawerState = useAppSelector((state) => state.eventReducer.drawerState)

    return (
        <Main open={drawerState} sx={{
            py: 10,
        }}>
            <Paper sx={{
                px: 5, py: 2, display: 'flex', flexDirection: 'column',
                backgroundColor: (theme) => theme.palette.grey[200],
                borderRadius: (theme) => theme.spacing(2),
                overflow: 'hidden'
            }} >
                <Box
                    sx={{
                        overflow: 'auto',
                    }}
                >
                    <AddEventWidget />
                </Box>
            </Paper>
        </Main >
    );
}

