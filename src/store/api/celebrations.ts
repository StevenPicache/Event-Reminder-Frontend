import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

const API_URL = 'http://localhost:8000/'

const base = fetchBaseQuery({
  baseUrl: API_URL, // TURN INTO .ENV VARIABLE
  prepareHeaders: (headers) => {
    headers.set('Acess-Control-Allow-Origin', API_URL)
    headers.set('Content-Type', 'application/json')
    headers.set('X-API-KEY', 'KEY_API')
    return headers
  },
})
export const celebrationsApi = createApi({
  reducerPath: 'celebrationsApi',
  baseQuery: base,
  tagTypes: ['Celebrations'],
  endpoints: () => ({}),
})
