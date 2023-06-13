import * as React from 'react';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';

interface InputBoxData {
    autocomplete: string;
    xs: number;
    sm?: number;
    name: string;
    label: string;
    value: string;
    setValue: React.Dispatch<React.SetStateAction<string>>;
}

export default function InputBoxComponent({ autocomplete, xs, sm, name, label, value, setValue }: InputBoxData) {
    return (
        <Grid item xs={xs} sm={sm ?? 0}>
            <TextField
                autoComplete={autocomplete}
                name={name}
                required
                fullWidth
                id={name}
                label={label}
                value={value}
                onChange={(e) => setValue(e.target.value)}
                autoFocus
            />
        </Grid>
    )
}