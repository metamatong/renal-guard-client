import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { ActionReducerMapBuilder } from '@reduxjs/toolkit';
import axios from 'axios';

export interface MealHistoryItem {
  id: number;
  created_at: string;
  content: string;
  sodium?: number;
  potassium?: number;
  phosphorus?: number;
  water?: number;
  calories?: number;
  dish_name?: string;
}

interface HistoryState {
  meals: MealHistoryItem[];
  status: 'idle' | 'loading' | 'error';
  error?: string;
}

const initialState: HistoryState = {
  meals: [],
  status: 'idle',
};

export const fetchMealHistory = createAsyncThunk<
  MealHistoryItem[],
  { uid: string },
  { rejectValue: string }
>(
  'history/fetchMealHistory',
  async ({ uid }, thunkAPI) => {
    const endpoint = import.meta.env.VITE_AWS_HISTORY_ENDPOINT;
    if (!endpoint) throw new Error('Missing VITE_AWS_HISTORY_ENDPOINT');
    const timestamp = new Date().toISOString();
    try {
      const response = await axios.get<{ results: MealHistoryItem[] }>(endpoint, {
        params: { uid, timestamp }
      });
      return Array.isArray(response.data.results) ? response.data.results : [];
    } catch (err: any) {
      const msg =
        axios.isAxiosError(err) && err.response?.data?.message
          ? err.response.data.message
          : err.message || 'Fetch failed';
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {},
  extraReducers(builder: ActionReducerMapBuilder<HistoryState>) {
    builder
      .addCase(fetchMealHistory.pending, state => {
        state.status = 'loading';
        state.error = undefined;
      })
      .addCase(fetchMealHistory.fulfilled, (state, action) => {
        state.status = 'idle';
        state.meals = action.payload;
      })
      .addCase(fetchMealHistory.rejected, (state, action) => {
        state.status = 'error';
        state.error = action.payload;
      });
  }
});

export default historySlice.reducer;