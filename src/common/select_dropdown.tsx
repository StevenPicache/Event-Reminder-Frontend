import React from 'react'
import {
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    SelectChangeEvent,
} from '@mui/material'

type SelectDropDownProps = {
    options: string[]
    selectLabel?: string
    selectValue: string
    errorValue?: boolean
    selectOnChange?: (event: SelectChangeEvent<string>) => void
    selectOnClick?: (event: React.SyntheticEvent<Element, Event>) => void
}

function SelectDropDown(props: SelectDropDownProps) {
    const {
        options,
        selectLabel,
        selectValue,
        errorValue,
        selectOnChange,
        selectOnClick,
    } = props
    return (
        <FormControl fullWidth sx={{ minWidth: 120 }} error={errorValue}>
            <InputLabel id={selectLabel}>{selectLabel}</InputLabel>
            <Select
                labelId={selectLabel}
                id={selectLabel}
                value={selectValue}
                label={selectLabel}
                onChange={selectOnChange}
                onClick={selectOnClick}
                onClose={selectOnClick}
            >
                {options.map((value, index) => (
                    <MenuItem key={index} value={value}>
                        {value}
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    )
}

export default SelectDropDown
