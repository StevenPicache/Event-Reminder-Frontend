import { configureStore } from '@reduxjs/toolkit'
import eventReducer from './slice/event'
import { eventsApi } from './api/event'

export const store = configureStore({
  reducer: {
    [eventsApi.reducerPath]: eventsApi.reducer,
    eventReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(eventsApi.middleware),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
