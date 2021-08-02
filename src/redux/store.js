import { configureStore } from '@reduxjs/toolkit'
import locationSlice from '../features/location/locationSlice'

export const store = configureStore({
  reducer: {
    location: locationSlice,
  },
})