import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import InputBoxComponent from '../common_components/input_box';

import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { addUser, login } from '../slice/user';
import { User, LoginData } from '../types/user';
import { useAppDispatch, useAppSelector } from '../hooks'


const defaultTheme = createTheme();

interface Label { label: string; }

function SignUpView({ label }: Label) {
    return (
        <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 5 }}>
            {'Copyright © '}
            <Link color="inherit" href="https://mui.com/">
                {label}

            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}


function TitleAndHeader({ label }: Label) {
    return (
        <>
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
                {/* <LockOutlinedIcon />  */}
                {/* replace with jia icons  */}
            </Avatar>

            <Typography component="h1" variant="h5">

                {label}
            </Typography>
        </>
    )
}

function AgreeToRecievePromotions({ label }: Label) {
    return (

        <Grid item xs={12}>
            <FormControlLabel
                control={<Checkbox value="allowExtraEmails" color="primary" />}
                label={label}

            />
        </Grid>
    )
}


function SubmitButton({ label }: Label) {
    return (
        <Button
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
        >
            {label}

        </Button>
    )
}


function AlreadyHaveAnAccount({ label }: Label) {
    return (
        <Grid container justifyContent="flex-end">
            <Grid item>
                <Link href="#" variant="body2">
                    {label}

                </Link>
            </Grid>
        </Grid>
    )
}



export default function SignUp() {
    const dispatch = useAppDispatch();
    const testName = useAppSelector((state) => state.userReducer.user.firstName)


    const [firstName, setFirstName] = useState<string>('');
    const [lastName, setLastName] = useState<string>('');
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');



    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const user = {
            firstName: data.get('firstName'),
            lastName: data.get('lastName'),
            password: data.get('password'),
            email: data.get('email')
        } as User

        const loginData = {
            email: data.get('email'),
            password: data.get('password')
        } as LoginData

        dispatch(addUser(user));
        dispatch(login(loginData));


    };


    return (
        <ThemeProvider theme={defaultTheme}>
            <Container component="main" maxWidth="xs">
                <CssBaseline />
                <Box
                    sx={{
                        marginTop: 8,
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center'
                    }}>
                    <TitleAndHeader label="Sign up" />
                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <InputBoxComponent autocomplete="given-name" xs={12} sm={6} name="firstName" label="First Name" value={firstName} setValue={setFirstName} />
                            <InputBoxComponent autocomplete="family-name" xs={12} sm={6} name="lastName" label="Last Name" value={lastName} setValue={setLastName} />
                            <InputBoxComponent autocomplete="email" xs={12} name="email" label="Email Address" value={email} setValue={setEmail} />
                            <InputBoxComponent autocomplete="new-password" xs={12} name="password" label="Password" value={password} setValue={setPassword} />

                        </Grid>
                        <AgreeToRecievePromotions label="I want to receive inspiration, marketing promotions and updates via email." />
                        <SubmitButton label="Sign Up" />
                        <AlreadyHaveAnAccount label="Already have an account? Sign in" />
                    </Box>
                </Box>
                <SignUpView label='Your Website' />
            </Container>
        </ThemeProvider>
    );
}
