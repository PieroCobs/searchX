import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {RecordMap} from '../types/user';
import {RootState} from '../store';

export interface SearchResultState {
  results?: RecordMap;
  numberOfPages: number;
  currentPage?: number;
  lastPage: number;
}

const initialState: SearchResultState = {
  numberOfPages: 1,
  currentPage: 1,
  lastPage: 1,
};

export const searchResultSlice = createSlice({
  name: 'searchResult',
  initialState,
  reducers: {
    setResults: (state, action: PayloadAction<SearchResultState>) => {
      return {...state, ...action.payload};
    },

    incrementCurrentPage: (state, _) => {
      if (state.currentPage === state.numberOfPages) {
        return state;
      }
      return {...state, currentPage: state.currentPage! + 1};
    },

    decrementCurrentPage: (state, _) => {
      if (state.currentPage === 0) {
        return state;
      }
      return {...state, currentPage: state.currentPage! - 1};
    },
  },
});

export const {setResults, incrementCurrentPage, decrementCurrentPage} =
  searchResultSlice.actions;

export const selectSearchResult = (state: RootState) =>
  state.searchResult.results;

export const selectNumberOfPages = (state: RootState) =>
  state.searchResult.numberOfPages;

export const selectCurentPage = (state: RootState) =>
  state.searchResult.currentPage;

export const selectLastPage = (state: RootState) => state.searchResult.lastPage;

export default searchResultSlice.reducer;
