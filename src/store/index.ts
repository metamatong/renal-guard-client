import { configureStore } from '@reduxjs/toolkit';

import scan from './scanSlice';
import history from './historySlice';

export const store = configureStore({
  reducer: {
    scan,
    history,
  },
});
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;