import * as React from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

/// TECH DEBT: REMOVE SET VALUE PROPS

type InputBoxData = {
    autocomplete: string;
    xs: number;
    name: string;
    label: string;
    value: string;
    autofocus?: boolean;
    setValue: React.Dispatch<React.SetStateAction<string>>;
}

export default function InputBoxComponent({ autocomplete, xs, name, label, value, autofocus, setValue }: InputBoxData) {
    return (
        <Grid item xs={xs} >
            <TextField
                autoComplete={autocomplete}
                name={name}
                required
                fullWidth
                id={name}
                label={label}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                autoFocus={autofocus}
            />
        </Grid>
    )
}