import React from 'react'
import { ClearRounded } from '@mui/icons-material'
import {
    Box,
    FormControl,
    IconButton,
    InputAdornment,
    OutlinedInput,
} from '@mui/material'

type EventSearchBar = {
    searchTerm: string
    disable?: boolean
    searchOnChange?: React.ChangeEventHandler<HTMLInputElement>
    clearTextField?: React.MouseEventHandler<HTMLButtonElement>
}
export function SearchBar(props: EventSearchBar) {
    const { searchTerm, disable, searchOnChange, clearTextField } = props
    return (
        <FormControl
            variant="filled"
            sx={{
                width: '100%',
                minWidth: 120,
                mr: 2,
            }}
        >
            <OutlinedInput
                autoFocus
                disabled={disable}
                placeholder="Search Event"
                value={searchTerm}
                onChange={searchOnChange}
                id="clear-search-bar"
                sx={{ pr: 2 }}
                endAdornment={
                    <InputAdornment position="end">
                        {searchTerm.length !== 0 ? (
                            <IconButton
                                aria-label="Clear search"
                                onClick={clearTextField}
                                edge="end"
                            >
                                <ClearRounded />
                            </IconButton>
                        ) : (
                            <Box />
                        )}
                    </InputAdornment>
                }
            />
        </FormControl>
    )
}
