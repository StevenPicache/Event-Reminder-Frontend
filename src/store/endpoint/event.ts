import { ErrorResponse, Events } from '../../types/event'
import { eventsApi } from '../api/event'

const PATH_API_EVENTS = 'events/v0/events'

export const eventEndpoints = eventsApi.injectEndpoints({
    endpoints: (build) => ({
        getEvents: build.query<Events[], void>({
            query() {
                return {
                    url: PATH_API_EVENTS,
                    method: 'GET',
                }
            },
            providesTags: ['Events'],
        }),

        searchEvents: build.query<Events[], string>({
            query(searchText) {
                return {
                    url: `${PATH_API_EVENTS}/${searchText}`,
                    method: 'GET',
                }
            },
            providesTags: ['Events'],
        }),

        weekRangeEvents: build.query<Events[], number>({
            query(range) {
                return {
                    url: `${PATH_API_EVENTS}/range/${range}`,
                    method: 'GET',
                }
            },
            providesTags: ['Events'],
        }),

        addEvents: build.mutation<ErrorResponse, Events>({
            query(body) {
                return {
                    url: PATH_API_EVENTS,
                    method: 'POST',
                    body: body,
                }
            },
            invalidatesTags: ['Events'],
        }),

        deleteEvent: build.mutation<{ success: boolean; id: number }, number>({
            query(id) {
                return {
                    url: `${PATH_API_EVENTS}/delete/${id}`,
                    method: 'DELETE',
                }
            },
            invalidatesTags: ['Events'],
        }),

        editEvent: build.mutation<void, Events>({
            query(body) {
                const { eventId } = body
                return {
                    url: `${PATH_API_EVENTS}/edit/${eventId}`,
                    method: 'PUT',
                    body: { ...body },
                }
            },
            invalidatesTags: ['Events'],
        }),
    }),
})

export const {
    useGetEventsQuery,
    useSearchEventsQuery,
    useWeekRangeEventsQuery,
    useAddEventsMutation,
    useDeleteEventMutation,
    useEditEventMutation,
} = eventEndpoints
export const {
    endpoints: { getEvents },
} = eventEndpoints
