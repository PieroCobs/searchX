import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {RootState} from '../store';
import FilterCriteria from '../types/filter';

export interface AppState {
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
  name: 'search',
  initialState,
  reducers: {
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

export const {updateSearchStatus, setSearchTerm, setSearchCriteria} =
  appSlice.actions;

export const selectIsSearching = (state: RootState) => state.search.isSearching;
export const selectSearchTerm = (state: RootState) => state.search.searchTerm;
export const selectSearchCriteria = (state: RootState) =>
  state.search.searchCriteria;

export default appSlice.reducer;
