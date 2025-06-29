import type {ActionReducerMapBuilder} from '@reduxjs/toolkit';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import axios from 'axios';


export type ScanResponse = {
  [key: string]: any
}

const baseURL = import.meta.env.VITE_AWS_ENDPOINT

export const uploadImageThunk = createAsyncThunk<
  ScanResponse,
  { file: File; uid: string },
  { rejectValue: string }
>(
  'scan/uploadImage',
  async ({ file, uid }, thunkAPI) => {
    if (!baseURL) throw new Error('Missing VITE_AWS_ENDPOINT');

    const form = new FormData();
    form.append('file', file);

    try {
      const url = `${baseURL}?uid=${encodeURIComponent(uid)}`;
      const { data } = await axios.post<ScanResponse>(url, form, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      return data;
    } catch (err) {
      const msg =
        axios.isAxiosError(err) && err.response?.data?.message
          ? err.response.data.message
          : 'Upload failed';
      return thunkAPI.rejectWithValue(msg);
    }
  }
);

type ScanState = {
  result: ScanResponse | null
  status: 'idle' | 'loading' | 'error'
  error?: string
}

const initialState: ScanState = {result: null, status: 'idle'}

const scanSlice = createSlice({
  name: 'scan',
  initialState,
  reducers: {
    clearScan(state) {
      state.result = null
      state.status = 'idle'
      state.error = undefined
    }
  },
  extraReducers(builder: ActionReducerMapBuilder<ScanState>) {
    builder
      .addCase(uploadImageThunk.pending, (state) => {
        state.status = 'loading'
        state.error = undefined
      })
      .addCase(uploadImageThunk.fulfilled, (state, action) => {
        state.status = 'idle'
        state.result = action.payload
      })
      .addCase(uploadImageThunk.rejected, (state, action) => {
        state.status = 'error'
        state.error = action.payload
      })
  }
})

export const {clearScan} = scanSlice.actions
export default scanSlice.reducer