import { celebrationsApi } from '../api/celebrations'

export type Events = {
  id: number
  name: string
  birthDate: Date
  weddingAnniversary: Date
}

const celebrationsEndpoints = celebrationsApi.injectEndpoints({
  endpoints: (build) => ({
    getEvents: build.query<Events[], void>({
      query() {
        return { url: 'users/v0/user', method: 'GET' }
      },
    }),
  }),
})

export const { useGetEventsQuery } = celebrationsEndpoints
export const {
  endpoints: { getEvents },
} = celebrationsEndpoints
