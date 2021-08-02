import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  lat: 51.509865,
  lon: -0.118092,
  units: 'metric'
}

export const locationSlice = createSlice({
  name: 'location',
  initialState,
  reducers: {
    set: (state, action) => {
      state.lat = action.payload.lat;
      state.lon = action.payload.lon;
    },
    uni: (state, action) => {
      state.units = action.payload.units;
    }
  }
})

export const { set, uni } = locationSlice.actions

export default locationSlice.reducer