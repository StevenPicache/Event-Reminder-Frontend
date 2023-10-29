import * as React from 'react';
import { useState } from 'react';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
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



export default function Events() {
    return (
        <Box>
            <Container component="main" maxWidth="xs">
                <Box component="form" noValidate sx={{ mt: 3 }}>
                    <h1>Hello events</h1>
                    <Grid container spacing={2}>
                        <InputBox />
                        <DatePickerComponent />
                    </Grid >
                </Box >
            </Container>
        </Box>

    );
}
