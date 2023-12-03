import {configureStore} from '@reduxjs/toolkit';
import {enableMapSet} from 'immer';
import appSlice from './redux/appSlice';

export const store = configureStore({
  reducer: {
    search: appSlice,
  },
});

enableMapSet();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
