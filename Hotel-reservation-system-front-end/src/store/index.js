import { configureStore } from '@reduxjs/toolkit'
import authSlice from './authSlice'
import hotelSlice from './hotelSlice'
import bookingSlice from './bookingSlice'

const store = configureStore({
  reducer: {
    auth: authSlice,
    hotels: hotelSlice,
    bookings: bookingSlice
  }
})

export default store