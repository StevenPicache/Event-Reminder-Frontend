import { ErrorResponse, GetEvents, PostEvents } from '../../types/event'
import { eventsApi } from '../api/event'

const PATH_API_EVENTS = 'events/v0/events'
export const eventEndpoints = eventsApi.injectEndpoints({
    endpoints: (build) => ({
        getEvents: build.query<GetEvents[], string>({
            query() {
                return {
                    url: PATH_API_EVENTS,
                    method: 'GET',
                }
            },
            providesTags: ['Events'],
        }),

        addEvents: build.mutation<ErrorResponse, PostEvents>({
            query(body) {
                return {
                    url: PATH_API_EVENTS,
                    method: 'POST',
                    body: body,
                }
            },
            invalidatesTags: ['Events'],
        }),

        searchEvents: build.query<GetEvents[], string>({
            query(searchText) {
                return {
                    url: `${PATH_API_EVENTS}/${searchText}`,
                    method: 'GET',
                }
            },
            providesTags: ['Events'],
        }),
    }),
})

export const { useGetEventsQuery, useAddEventsMutation, useSearchEventsQuery } =
    eventEndpoints
export const {
    endpoints: { getEvents },
} = eventEndpoints
