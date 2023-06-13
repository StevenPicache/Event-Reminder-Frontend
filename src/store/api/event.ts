import { createApi } from '@reduxjs/toolkit/query/react'
import { fetchBase } from './baseQuery'

export const eventsApi = createApi({
  reducerPath: 'eventsApi',
  baseQuery: fetchBase,
  tagTypes: ['Events'],
  endpoints: () => ({}),
})
