export const API_URL = 'http://localhost:8000/'

export type RouteTypes = {
  name: string
  path: string
}

export const RoutePaths = {
  default: '/',
  Events: '/events',
  AddEvents: '/add-events',
}

export const listItems: RouteTypes[] = [
  {
    name: 'Events',
    path: RoutePaths.Events,
  },
  {
    name: 'Add Events',
    path: RoutePaths.AddEvents,
  },
]
