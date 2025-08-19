import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import ApiService from '../services/api'

// 异步thunk - 获取宾馆列表
export const fetchHotels = createAsyncThunk(
  'hotels/fetchHotels',
  async (searchParams = {}, { rejectWithValue }) => {
    try {
      const response = await ApiService.getHotels(searchParams)
      if (response.code !== 0) {
        return rejectWithValue(response.msg || '获取宾馆列表失败')
      }
      return response.data
    } catch (error) {
      return rejectWithValue(error.message || '获取宾馆列表失败')
    }
  }
)

// 异步thunk - 获取宾馆详情
export const fetchHotelById = createAsyncThunk(
  'hotels/fetchHotelById',
  async (hotelId, { rejectWithValue }) => {
    try {
      const response = await ApiService.getHotelById(hotelId)
      if (response.code !== 0) {
        return rejectWithValue(response.msg || '获取宾馆详情失败')
      }
      return response.data
    } catch (error) {
      return rejectWithValue(error.message || '获取宾馆详情失败')
    }
  }
)

// 异步thunk - 获取宾馆房间类型
export const fetchRoomTypes = createAsyncThunk(
  'hotels/fetchRoomTypes',
  async (hotelId, { rejectWithValue }) => {
    try {
      const response = await ApiService.getRoomTypes(hotelId)
      if (response.code !== 0) {
        return rejectWithValue(response.msg || '获取房间类型失败')
      }
      return response.data
    } catch (error) {
      return rejectWithValue(error.message || '获取房间类型失败')
    }
  }
)

const hotelSlice = createSlice({
  name: 'hotels',
  initialState: {
    hotels: [],
    currentHotel: null,
    roomTypes: [],
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
      // 获取宾馆列表
      .addCase(fetchHotels.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchHotels.fulfilled, (state, action) => {
        state.loading = false
        state.hotels = action.payload
      })
      .addCase(fetchHotels.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // 获取宾馆详情
      .addCase(fetchHotelById.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchHotelById.fulfilled, (state, action) => {
        state.loading = false
        state.currentHotel = action.payload
      })
      .addCase(fetchHotelById.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // 获取房间类型
      .addCase(fetchRoomTypes.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchRoomTypes.fulfilled, (state, action) => {
        state.loading = false
        state.roomTypes = action.payload
      })
      .addCase(fetchRoomTypes.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
  }
})

export const { clearError } = hotelSlice.actions
export default hotelSlice.reducer