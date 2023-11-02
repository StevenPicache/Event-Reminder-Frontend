import { eventsApi } from '../api/event'

export type GetEvents = {
  eventId: number
  name: string
  eventDate: Date
  eventType: string
}

export type PostEvents = {
  firstName: string
  lastName: string
  eventType: string
  eventDate: Date
}

const PATH_API_EVENTS = 'events/v0/events'

export const eventEndpoints = eventsApi.injectEndpoints({
  endpoints: (build) => ({
    getEvents: build.query<GetEvents[], void>({
      query() {
        return {
          url: PATH_API_EVENTS,
          method: 'GET',
        }
      },
      providesTags: ['Events'],
    }),

    addEvents: build.mutation<void, PostEvents>({
      query(body) {
        return {
          url: PATH_API_EVENTS,
          method: 'POST',
          body: body,
        }
      },
      invalidatesTags: ['Events'],
    }),
  }),
})

export const { useGetEventsQuery, useAddEventsMutation } = eventEndpoints
export const {
  endpoints: { getEvents },
} = eventEndpoints
