import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { API_URL } from '../../constants/constants'

const base = fetchBaseQuery({
    baseUrl: API_URL,
    prepareHeaders: (headers) => {
        headers.set('Acess-Control-Allow-Origin', API_URL)
        headers.set('Content-Type', 'application/json')
        headers.set('X-API-KEY', 'KEY_API')
        return headers
    },
})

export const eventsApi = createApi({
    reducerPath: 'eventsApi',
    baseQuery: base,
    tagTypes: ['Events'],
    endpoints: () => ({}),
})
