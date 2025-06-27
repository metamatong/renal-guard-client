import { configureStore } from '@reduxjs/toolkit';
import scan from './scanSlice';

export const store = configureStore({
  reducer: { scan },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;