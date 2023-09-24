import * as React from 'react';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Link from '@mui/material/Link';
import Grid from '@mui/material/Grid';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import InputBoxComponent from '../common_components/input_box';
import { login } from '../slice/user';
import { LoginData } from '../types/user';
import MainPage from '../view/MainPage';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../hooks'
import { useNavigate } from 'react-router-dom';
import { RoutePaths } from '../constants/routes';


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
            <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }} />
            <Typography component="h1" variant="h5">

                {label}
            </Typography>
        </>
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


interface State {
    state: boolean
}
function SignInForm(state: State) {
    const dispatch = useAppDispatch();
    const navigation = useNavigate();

    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const loginData = {
            email: data.get('email'),
            password: data.get('password')
        } as LoginData

        console.log(loginData)
        dispatch(login(loginData));

        if (state) {
            navigation(RoutePaths.Main);
        }
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
                    <TitleAndHeader label="Sign In" />

                    <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 3 }}>
                        <Grid container spacing={2}>
                            <InputBoxComponent autocomplete="email" xs={12} name="email" label="Email Address" value={email} setValue={setEmail} autofocus={true} />
                            <InputBoxComponent autocomplete="new-password" xs={12} name="password" label="Password" value={password} setValue={setPassword} />
                        </Grid>
                        <SubmitButton label="Sign In" />
                    </Box>
                </Box>
                <SignUpView label='Your Website' />
            </Container>
        </ThemeProvider>
    );
}


export default function SignInMain() {
    const isAuthenticated = useAppSelector((state) => state.userReducer.isAuthenticated)
    console.log('Updating')
    if (isAuthenticated) {
        return (<MainPage />)
    }

    return (
        <SignInForm state={isAuthenticated} />
    );
}