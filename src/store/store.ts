import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slice/user'
import celebrationReducer from './slice/celebrations'
import { userApi } from './api/user'
import { celebrationsApi } from './api/celebrations'

export const store = configureStore({
  reducer: {
    [userApi.reducerPath]: userApi.reducer,
    [celebrationsApi.reducerPath]: celebrationsApi.reducer,
    userReducer,
    celebrationReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      userApi.middleware,
      celebrationsApi.middleware,
    ),
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
