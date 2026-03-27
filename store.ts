import { configureStore } from '@reduxjs/toolkit'
import appLaunchReducer from './src/features/AppLaunch'
import globalSettingsReducer from './src/features/GlobalSettings'

export const store = configureStore({
  reducer: {
    appLaunch: appLaunchReducer,
    globalSettings: globalSettingsReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch