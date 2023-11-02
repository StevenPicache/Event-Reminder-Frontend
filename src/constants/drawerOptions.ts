import { RoutePaths } from '../routes'

export type RouteTypes = {
  name: string
  path: string
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
