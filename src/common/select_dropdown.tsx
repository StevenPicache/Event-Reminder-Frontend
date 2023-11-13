import React from 'react'
import { FormControl, MenuItem, Select, SelectChangeEvent } from '@mui/material'

type SelectDropDownProps = {
    options: string[]
    selectValue: string
    errorValue?: boolean
    selectOnChange?: (
        event: SelectChangeEvent<string>,
        child: React.ReactNode,
    ) => void

    selectOnClick?: (event: React.SyntheticEvent<Element, Event>) => void
}
function SelectDropDown(props: SelectDropDownProps) {
    const { options, selectValue, errorValue, selectOnChange, selectOnClick } =
        props
    return (
        <FormControl
            sx={{
                width: '100%',
            }}
            error={errorValue}
            color="error"
        >
            <Select
                placeholder="other"
                labelId="select-label"
                id="select-label"
                value={selectValue}
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
{
    /* <MenuItem value="other">Other</MenuItem>
                <MenuItem value={'Birthay'}>Birthday</MenuItem>
                <MenuItem value={'Wedding Anniversary'}>
                    Wedding Anniversary
                </MenuItem>
                <MenuItem value={'Graduation'}>Graduation</MenuItem> */
}
