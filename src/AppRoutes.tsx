import React from 'react'
import { Route, Routes } from 'react-router-dom'
import { RoutePaths } from './constants/routes'
import Events from './widgets/Event'
import EventForm from './widgets/EventForm'

export default function AppRoutes() {
    return (
        <Routes>
            <Route path={RoutePaths.default} Component={Events} />
            <Route path={RoutePaths.Events} Component={Events} />
            <Route path={RoutePaths.AddEvents} Component={EventForm} />
        </Routes>
    )
}
