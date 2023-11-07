import React from 'react';
import { ClearRounded } from '@mui/icons-material';
import { Box, FormControl, IconButton, InputAdornment, InputLabel, OutlinedInput } from '@mui/material';

type EventSearchBar = {
    searchTerm: string,
    searchOnChange?: React.ChangeEventHandler<HTMLInputElement>
    clearTextField?: React.MouseEventHandler<HTMLButtonElement>
}
export function SearchBar(props: EventSearchBar) {
    const { searchTerm, searchOnChange, clearTextField } = props
    return (
        <FormControl variant="filled">
            <InputLabel htmlFor="clear-search-bar"  >Search Event</InputLabel>
            <OutlinedInput
                autoFocus
                value={searchTerm}
                onChange={searchOnChange}
                id="clear-search-bar"
                sx={{ pr: 2 }}
                endAdornment={
                    <InputAdornment position="end">
                        {searchTerm.length !== 0 ? <IconButton
                            aria-label="Clear search"
                            onClick={clearTextField}
                            edge="end"
                        >
                            <ClearRounded />
                        </IconButton> : <Box />}

                    </InputAdornment>
                }
            />
        </FormControl >

    )
}