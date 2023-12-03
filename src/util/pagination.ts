import {PAGE_SIZE} from '../constants/numeric_constants';
import {Records, RecordMap} from '../types/user';

export type PaginatedData = {
  results: RecordMap;
  numberOfPages: number;
  currentPage: number;
};

const paginateData = (data: Records): PaginatedData => {
  const results = new Map();
  let numberOfPages = 0;
  for (let i = 0; i < data.length; i += PAGE_SIZE) {
    const page = data.slice(i, i + PAGE_SIZE);
    const pageNumber = i / PAGE_SIZE + 1;
    results.set(pageNumber, page);
  }
  numberOfPages = results.size;
  return {results, numberOfPages, currentPage: 1};
};

export default paginateData;
