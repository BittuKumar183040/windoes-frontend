import { configureStore } from '@reduxjs/toolkit'
import appLaunchReducer from './src/features/AppLaunch'

export const store = configureStore({
  reducer: {
    appLaunch: appLaunchReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch