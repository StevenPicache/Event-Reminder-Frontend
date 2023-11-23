import { ErrorResponse, Events } from '../../types/event'
import { eventsApi } from '../api/event'

const PATH_API_EVENTS = 'events/v0/events'

export const eventEndpoints = eventsApi.injectEndpoints({
    endpoints: (build) => ({
        getEvents: build.query<Events[], { search?: string; range?: string }>({
            query(args) {
                const { search, range } = args
                return {
                    url: PATH_API_EVENTS,
                    params: { search, range },
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
    useAddEventsMutation,
    useDeleteEventMutation,
    useEditEventMutation,
} = eventEndpoints
