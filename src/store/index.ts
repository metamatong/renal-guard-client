import { configureStore } from '@reduxjs/toolkit';
import auth from './authSlice';
import scan from './scanSlice';

export const store = configureStore({
  reducer: { auth, scan },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;