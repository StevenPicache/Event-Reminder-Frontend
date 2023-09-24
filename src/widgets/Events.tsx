import * as React from 'react';
import { useState } from 'react';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import FormControlLabel from '@mui/material/FormControlLabel';
import InputBoxComponent from '../common_components/input_box';
import DatePickerComponent from '../common_components/date_picker';


function InputBox() {
    const [firstName, setFirstName] = useState<string>('')
    const [lastName, setLastName] = useState<string>('')

    return (
        <>
            <InputBoxComponent value={firstName} setValue={setFirstName} autocomplete="firstname" xs={12} name="firstName" label="First Name" />
            <InputBoxComponent value={lastName} setValue={setLastName} autocomplete="lastname" xs={12} name="lastName" label="Last name" />
        </>
    )
}

function Checkbox() {
    return (
        <Box
            sx={{
                display: 'flex',
                justifyContent: 'space-evenly',
                m: 1,
                bgcolor: 'background.paper',
                borderRadius: 1,
            }}
        >
            <FormControlLabel
                control={<Checkbox />}
                label="Birthday"
            />
            <FormControlLabel
                control={<Checkbox />}
                label="Anniversary"
            />
        </Box>
    )
}

export default function Events() {
    return (
        <Container component="main" maxWidth="xs">
            <Box component="form" noValidate sx={{ mt: 3 }}>
                <Grid container spacing={2}>
                    <InputBox />
                    <DatePickerComponent />
                    <Checkbox />
                </Grid >
            </Box >
        </Container>
    );
}
