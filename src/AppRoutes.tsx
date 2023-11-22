import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { RoutePaths } from './constants/routes'
import EventsTable from './widgets/EventTable'
import EventForm from './widgets/EventForm'

export default function AppRoutes() {
    return (
        <Routes>
            <Route path={RoutePaths.default} Component={EventsTable} />
            <Route path={RoutePaths.Events} Component={EventsTable} />
            <Route path={RoutePaths.AddEvents} Component={EventForm} />
        </Routes>
    )
}
