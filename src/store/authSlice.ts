import type {ActionReducerMapBuilder} from '@reduxjs/toolkit';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios, {AxiosError} from 'axios';


export type User = { id: number; name: string; email: string };

export const loginThunk = createAsyncThunk<
  User,
  { username: string; password: string },
  { rejectValue: string }
>(
  'auth/login',
  async (body, thunkAPI) => {
    try {
      const {data} = await axios.post<User>(
        '/api/auth/login',
        body,
        {withCredentials: true}
      );
      return data;
    } catch (err: unknown) {
      let message = 'Login failed';
      if (axios.isAxiosError(err) && err.response) {
        message = (err as AxiosError<{ message: string }>).response!.data.message;
      }
      return thunkAPI.rejectWithValue(message);
    }
  });

type AuthState = {
  user: User | null;
  status: 'idle' | 'loading' | 'error';
  error?: string;
};

const initialState: AuthState = {user: null, status: 'idle'};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logout(state) {
      state.user = null
      state.status = 'idle'
    }
  },
  extraReducers(builder: ActionReducerMapBuilder<AuthState>) {
    builder
      .addCase(loginThunk.pending, (state) => {
        state.status = 'loading'
        state.error = undefined
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.status = 'idle'
        state.user = action.payload
      })
      .addCase(loginThunk.rejected, (state, action) => {
        state.status = 'error'
        state.error = action.payload
      })
  }
});

export const {logout} = authSlice.actions;
export default authSlice.reducer;