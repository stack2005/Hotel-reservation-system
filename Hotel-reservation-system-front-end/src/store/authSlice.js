import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import ApiService from '../services/api'

// 异步thunk - 用户注册
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await ApiService.registerUser(userData)
      if (response.code !== 0) {
        return rejectWithValue(response.msg || '注册失败')
      }
      return response.data
    } catch (error) {
      return rejectWithValue(error.message || '注册失败')
    }
  }
)

// 异步thunk - 用户登录
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, { rejectWithValue }) => {
    try {
      const response = await ApiService.loginUser(credentials)
      if (response.code !== 0) {
        return rejectWithValue(response.msg || '登录失败')
      }
      return response.data
    } catch (error) {
      return rejectWithValue(error.message || '登录失败')
    }
  }
)

// 异步thunk - 获取当前用户信息
export const fetchCurrentUser = createAsyncThunk(
  'auth/fetchCurrentUser',
  async (_, { rejectWithValue }) => {
    try {
      const response = await ApiService.getCurrentUser()
      if (response.code !== 0) {
        return rejectWithValue(response.msg || '获取用户信息失败')
      }
      return response.data
    } catch (error) {
      return rejectWithValue(error.message || '获取用户信息失败')
    }
  }
)

const authSlice = createSlice({
  name: 'auth',
  initialState: {
    user: null,
    token: localStorage.getItem('token') || null,
    loading: false,
    error: null,
    isAuthenticated: false
  },
  reducers: {
    logout: (state) => {
      state.user = null
      state.token = null
      state.isAuthenticated = false
      localStorage.removeItem('token')
    },
    clearError: (state) => {
      state.error = null
    }
  },
  extraReducers: (builder) => {
    builder
      // 注册用户
      .addCase(registerUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.isAuthenticated = true
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // 登录用户
      .addCase(loginUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload.user
        state.token = action.payload.token
        state.isAuthenticated = true
        localStorage.setItem('token', action.payload.token)
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
      })
      // 获取当前用户
      .addCase(fetchCurrentUser.pending, (state) => {
        state.loading = true
        state.error = null
      })
      .addCase(fetchCurrentUser.fulfilled, (state, action) => {
        state.loading = false
        state.user = action.payload
        state.isAuthenticated = true
      })
      .addCase(fetchCurrentUser.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload
        state.isAuthenticated = false
      })
  }
})

export const { logout, clearError } = authSlice.actions
export default authSlice.reducer