import * as React from 'react';
import { useEffect, useState } from 'react';
import Link from '@mui/material/Link';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Title from './title';
import { useGetEventsQuery } from '../store/endpoint/celebrations';




function preventDefault(event: React.MouseEvent) {
    event.preventDefault();
}
/// ADD PAGINATION TOO 
export default function UpcomingCelebrations() {
    const { data } = useGetEventsQuery();
    console.log('Querying data')
    console.log(data)
    return (
        <>
            <Title>Upcoming Celebrations</Title>
            <Table size="medium">
                <TableHead>
                    <TableRow>
                        <TableCell>Name</TableCell>
                        <TableCell>Birthdate</TableCell>
                        <TableCell align="right">Wedding Anniversary</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {data?.map((row) => (
                        <TableRow key={row.id}>
                            <TableCell>{row.name}</TableCell>
                            <TableCell>{`${row.birthDate}`}</TableCell>
                            <TableCell align="right">{`${row.weddingAnniversary}`}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
            <Link color="primary" href="#" onClick={preventDefault} sx={{ mt: 3 }}>
                See more
            </Link>
        </>
    );
}



// const data = [
//     {
//         id: 0,
//         name: 'Paul McCartney',
//         birthDate: '14 Mar, 2019',
//         weddingAnniversary: '14 Mar, 2019',
//     },

//     {
//         id: 1,
//         name: 'Michael Jackson',
//         birthDate: '15 Mar, 2019',
//         weddingAnniversary: '14 Mar, 2019',
//     },
//     {
//         id: 2,
//         name: 'Bruce Springsteen',
//         birthDate: '16 Mar, 2019',
//         weddingAnniversary: '14 Mar, 2019',
//     },

// ];
