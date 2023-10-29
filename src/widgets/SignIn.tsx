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
import { LoginData } from '../types/user';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';



import { useLoginUserMutation } from '../store/endpoint/login';


const defaultTheme = createTheme();

type Label = {
    label: string;
}

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



function SubmitButton(props: { label: string, disabled: boolean }) {
    return (
        <Button
            disabled={props.disabled}
            type="submit"
            fullWidth
            variant="contained"
            sx={{ mt: 3, mb: 2 }}
        >
            {props.label}

        </Button>
    )
}



function SignInForm() {
    const [login, { isLoading }] = useLoginUserMutation()
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);
        const loginData: LoginData = {
            email: data.get('email'),
            password: data.get('password')
        } as LoginData

        try {
            return await login(loginData).unwrap();
        } catch (error) {
            console.error('Rejected', JSON.stringify(error))
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
                        <SubmitButton label="Sign In" disabled={isLoading} />
                    </Box>
                </Box>
                <SignUpView label='Your Website' />
            </Container>
        </ThemeProvider>
    );
}


export default function SignInMain() {
    return (
        <SignInForm />
    );
}


