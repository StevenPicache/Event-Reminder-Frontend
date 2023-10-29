import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useGetEventsQuery } from '../store/endpoint/celebrations';
import { Box, Typography } from '@mui/material';


/// TODO: HELPER FUNCTION AND CONVERT DATE TO A HUMAN READABLE VERSION
export default function UpcomingCelebrations() {
    const { data } = useGetEventsQuery();
    return (
        <Box
            sx={{
                overflow: 'auto',
            }}
        >
            <Typography component="h1" variant="h4" color="primary" gutterBottom>
                {'Celebrations'}
            </Typography>

            <Table size="medium">
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                {'Name'}
                            </Typography>
                        </TableCell>
                        <TableCell>
                            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                {'Birthdate'}
                            </Typography>
                        </TableCell>
                        <TableCell align="right">
                            <Typography component="h2" variant="h6" color="primary" gutterBottom>
                                {'Wedding Anniversary'}
                            </Typography>
                        </TableCell>
                    </TableRow>
                </TableHead>

                <TableBody>
                    {data?.map((row, index) => (
                        <TableRow key={index}>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{`${row.birthDate}`}</TableCell>
                            <TableCell align="right">{`${row.weddingAnniversary}`}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Box>
    );
}