import { TextField } from '@mui/material'
import * as React from 'react'

type TextFieldProps = {
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
            aria-label={name}
            id={name}
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

export default TextFieldWidget
