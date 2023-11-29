import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {Records} from '../types/user';
import {RootState} from '../store';
import FilterCriteria from '../types/filter';

export interface AppState {
  records?: Records | null;
  searchResults?: Records;
  isSearching: boolean;
  searchTerm: string;
  searchCriteria: FilterCriteria;
}

const initialState: AppState = {
  isSearching: false,
  searchCriteria: 'name',
  searchTerm: '',
};

export const appSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    initRecords: (state, action: PayloadAction<Records>) => {
      return {...state, records: action.payload};
    },

    updateSearchStatus: (state, action: PayloadAction<boolean>) => {
      return {...state, isSearching: action.payload};
    },

    setSearchTerm: (state, action: PayloadAction<string>) => {
      return {...state, searchTerm: action.payload};
    },

    setSearchCriteria: (state, action: PayloadAction<FilterCriteria>) => {
      return {...state, searchCriteria: action.payload};
    },
  },
});

export const {
  initRecords,
  updateSearchStatus,
  setSearchTerm,
  setSearchCriteria,
} = appSlice.actions;
export const selectRecords = (state: RootState) => state.app.records;
export const selectIsSearching = (state: RootState) => state.app.isSearching;
export const selectSearchTerm = (state: RootState) => state.app.searchTerm;
export const selectSearchCriteria = (state: RootState) =>
  state.app.searchCriteria;
export default appSlice.reducer;
