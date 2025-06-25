import type {ActionReducerMapBuilder} from '@reduxjs/toolkit'
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit'
import axios, {AxiosError} from 'axios'


export type ScanResponse = {
  [key: string]: any
}

const baseURL = import.meta.env.VITE_AWS_ENDPOINT

export const uploadImageThunk = createAsyncThunk<
  ScanResponse,
  string,
  {rejectValue: string}
>(
  'scan/uploadImage',
  async (base64Image, thunkAPI) => {
    if (!baseURL) {
      console.error('[uploadImageThunk] missing VITE_AWS_ENDPOINT env var')
      throw new Error('Missing VITE_AWS_ENDPOINT environment variable')
    }
    console.debug('[uploadImageThunk] POST url:', baseURL)
    console.debug('[uploadImageThunk] sending base64 len:', base64Image.length)
    try {
      const {data} = await axios.post<ScanResponse>(baseURL, {image: base64Image})
      console.debug('[uploadImageThunk] response:', data)
      return data
    } catch (err: unknown) {
      if (axios.isAxiosError(err)) {
        console.error('[uploadImageThunk] Axios error:', {
          url: err.config.url,
          method: err.config.method,
          status: err.response?.status,
          response: err.response?.data
        })
      } else {
        console.error('[uploadImageThunk] Unknown error:', err)
      }
      let message = 'Upload failed'
      if (axios.isAxiosError(err) && err.response) {
        message = (err as AxiosError<{message: string}>).response!.data.message
      }
      return thunkAPI.rejectWithValue(message)
    }
  }
)

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