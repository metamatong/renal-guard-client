// src/features/auth/authSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export type User = { id: number; name: string; email: string };

export const loginThunk = createAsyncThunk<
  User,                               // return type
  { username: string; password: string }, // arg type
  { rejectValue: string }
>('auth/login', async (body, { rejectWithValue }) => {
  try {
    const { data } = await axios.post<User>(
      'http://localhost:3000/api/auth/login',
      body,
      { withCredentials: true }
    );
    return data;
  } catch (err: any) {
    return rejectWithValue(err.response?.data ?? 'Login failed');
  }
});

type AuthState = {
  user: User | null;
  status: 'idle' | 'loading' | 'error';
  error?: string;
};

const initialState: AuthState = { user: null, status: 'idle' };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout: (s) => {
      s.user = null;
      s.status = 'idle';
    },
  },
  extraReducers: (b) =>
    b
      .addCase(loginThunk.pending, (s) => {
        s.status = 'loading';
        s.error = undefined;
      })
      .addCase(loginThunk.fulfilled, (s, a) => {
        s.status = 'idle';
        s.user = a.payload;
      })
      .addCase(loginThunk.rejected, (s, a) => {
        s.status = 'error';
        s.error = a.payload;
      }),
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;