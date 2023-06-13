import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query'

const API_URL = 'http://localhost:8000/'

/// TODO: ADD AXIOS
export const fetchBase = fetchBaseQuery({
  baseUrl: API_URL, // TURN INTO .ENV VARIABLE
  prepareHeaders: (headers) => {
    headers.set('Acess-Control-Allow-Origin', API_URL)
    headers.set('Content-Type', 'application/json')
    headers.set('X-API-KEY', 'KEY_API')
    return headers
  },
})
