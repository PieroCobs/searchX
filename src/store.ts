import {configureStore} from '@reduxjs/toolkit';
import {enableMapSet} from 'immer';
import appSlice from './redux/appSlice';
import searchResultSlice from './redux/searchResultSlice';

export const store = configureStore({
  reducer: {
    app: appSlice,
    searchResult: searchResultSlice,
  },
});

enableMapSet();

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
