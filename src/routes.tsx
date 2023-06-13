
import React from 'react';
import { Route, Routes } from 'react-router-dom';

import UpcomingCelebrations from './widgets/Celebrations';
import CelebrationForm from './widgets/CelebrationForm';

export const RoutePaths = {
    default: '/',
    Main: '/main',
    Events: '/events',
    AddEvents: '/add-events',
}

export default function AppRoutes() {
    return (
        <Routes>
            <Route path={RoutePaths.default} Component={UpcomingCelebrations} />
            <Route path={RoutePaths.Events} Component={UpcomingCelebrations} />
            <Route path={RoutePaths.AddEvents} Component={CelebrationForm} />
        </Routes>
    )
}
