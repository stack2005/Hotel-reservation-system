import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import ApiService from '../services/api'

// 异步thunk - 创建新预订
export const createBooking = createAsyncThunk(
  'bookings/createBooking',
  async (bookingData, { rejectWithValue }) => {
    try {
      const response = await ApiService.createBooking(bookingData)
      if (response.code !== 0) {
        return rejectWithValue(response.msg || '创建预订失败')
      }
      return response.data
    } catch (error) {
      return rejectWithValue(error.message || '创建预订失败')
    }
  }
)

// 异步thunk - 获取用户预订列表
export const fetchUserBookings = createAsyncThunk(
  'bookings/fetchUserBookings',
  async (filterParams = {}, { rejectWithValue }) => {
    try {
      const response = await ApiService.getUserBookings(filterParams)
      if (response.code !== 0) {
        return rejectWithValue(response.msg || '获取预订列表失败')
      }
      return response.data
    } catch (error) {
      return rejectWithValue(error.message || '获取预订列表失败')
    }
  }
)

// 异步thunk - 获取预订详情
export const fetchBookingById = createAsyncThunk(
  'bookings/fetchBookingById',
  async (bookingId, { rejectWithValue }) => {
    try {
      const response = await ApiService.getBookingById(bookingId)
      if (response.code !== 0) {
        return rejectWithValue(response.msg || '获取预订详情失败')
      }
      return response.data
    } catch (error) {
      return rejectWithValue(error.message || '获取预订详情失败')
    }
  }
)

// 异步thunk - 更新预订
export const updateBooking = createAsyncThunk(
  'bookings/updateBooking',
  async ({ bookingId, updateData }, { rejectWithValue }) => {
    try {
      const response = await ApiService.updateBooking(bookingId, updateData)
      if (response.code !== 0) {
        return rejectWithValue(response.msg || '更新预订失败')
      }
      return response.data
    } catch (error) {
      return rejectWithValue(error.message || '更新预订失败')
    }
  }
)

// 异步thunk - 取消预订
export const cancelBooking = createAsyncThunk(
  'bookings/cancelBooking',
  async ({ bookingId, reason }, { rejectWithValue }) => {
    try {
      const response = await ApiService.cancelBooking(bookingId, reason)
      if (response.code !== 0) {
        return rejectWithValue(response.msg || '取消预订失败')
      }
      return response.data
    } catch (error) {
      return rejectWithValue(error.message || '取消预订失败')
    }
  }
)

const bookingSlice = createSlice({
  name: 'bookings',
  initialState: {
    bookings: [],
    currentBooking: null,
    loading: false,
    error: null
  },
  reducers: {
    clearError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      // 创建预订
      .addCase(createBooking.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.loading = false
        state.bookings.push(action.payload)
        state.currentBooking = action.payload
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // 获取用户预订列表
      .addCase(fetchUserBookings.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchUserBookings.fulfilled, (state, action) => {
        state.loading = false
        state.bookings = action.payload
      })
      .addCase(fetchUserBookings.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // 获取预订详情
      .addCase(fetchBookingById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchBookingById.fulfilled, (state, action) => {
        state.loading = false
        state.currentBooking = action.payload
      })
      .addCase(fetchBookingById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // 更新预订
      .addCase(updateBooking.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(updateBooking.fulfilled, (state, action) => {
        state.loading = false
        const index = state.bookings.findIndex(booking => booking.id === action.payload.id)
        if (index !== -1) {
          state.bookings[index] = action.payload
        }
        state.currentBooking = action.payload
      })
      .addCase(updateBooking.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // 取消预订
      .addCase(cancelBooking.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(cancelBooking.fulfilled, (state, action) => {
        state.loading = false
        const index = state.bookings.findIndex(booking => booking.id === action.payload.id)
        if (index !== -1) {
          state.bookings[index] = action.payload
        }
        state.currentBooking = action.payload
      })
      .addCase(cancelBooking.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export const { clearError } = bookingSlice.actions
export default bookingSlice.reducer