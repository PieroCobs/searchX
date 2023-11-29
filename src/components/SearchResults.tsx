/* eslint-disable react-hooks/exhaustive-deps */
import React, {useEffect, useState} from 'react';
import {View, Text, FlatList, StyleSheet} from 'react-native';
import Styles from '../styles/styles';
import SearchResultCard from './SearchResultCard';
import Spacer from './Spacer';
import FilterDropdown from './Filter';
import {useAppDispatch, useAppSelector} from '../hooks/redux';
import {
  selectIsSearching,
  selectRecords,
  selectSearchCriteria,
  selectSearchTerm,
  updateSearchStatus,
} from '../redux/appSlice';
import {RecordMap, Records} from '../types/user';
import FilterCriteria from '../types/filter';
import Paginator from './Paginator';
import {
  selectCurentPage,
  selectSearchResult,
  setResults,
} from '../redux/searchResultSlice';
import {PAGE_SIZE} from '../constants/numeric_constants';

export default function SearchResults() {
  const [sortCriteria, setSortCriteria] = useState<FilterCriteria>();
  const isSearching = useAppSelector(selectIsSearching);
  const records = useAppSelector(selectRecords);
  const searchTerm = useAppSelector(selectSearchTerm);
  const searchCriteria = useAppSelector(selectSearchCriteria);
  const searchResultsMap = useAppSelector(selectSearchResult);
  const currentPage = useAppSelector(selectCurentPage);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSearching) {
      const results: Records = [];
      for (let i = 0; i < records!.length; i++) {
        if (
          records![i][searchCriteria]
            ?.toString()
            ?.toLowerCase()
            ?.includes(searchTerm!.toLowerCase())
        ) {
          results.push(records![i]);
        }
      }
      sortSearchResults(results!, sortCriteria);
      const delay = setTimeout(() => dispatch(updateSearchStatus(false)), 300);

      return () => clearTimeout(delay);
    }
  }, [isSearching]);

  const sortSearchResults = (data: Records, sortBy?: FilterCriteria) => {
    if (sortBy === undefined) {
      dispatch(setResults(paginateData(data)));
    } else {
      let results: Records = [];
      if (sortCriteria === 'age') {
        results = sortNumeric(data);
      } else {
        results = sortAlphaNumeric(data, sortBy);
      }
      dispatch(setResults(paginateData(results)));
    }
  };

  const sortNumeric = (data: Records): Records => {
    let results = data;
    for (let i = results.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let k = results[i];
      results[i] = results[j];
      results[j] = k;
    }
    return results;
  };

  const sortAlphaNumeric = (data: Records, sortBy: FilterCriteria): Records => {
    return data.sort((a, b) => {
      let x = a[sortBy].toString().toLowerCase();
      let y = b[sortBy].toString().toLowerCase();
      if (x < y) {
        return -1;
      }
      if (x > y) {
        return 1;
      }
      return 0;
    });
  };

  const paginateData = (data: Records) => {
    const results = new Map();

    let lastPage = 1;
    let numberOfPages = 0;
    for (let i = 0; i < data.length; i += PAGE_SIZE) {
      const page = data.slice(i, i + PAGE_SIZE);
      const pageNumber = i / PAGE_SIZE + 1;
      results.set(pageNumber, page);
      lastPage = pageNumber;
    }
    numberOfPages = results.size;
    return {results, numberOfPages, lastPage};
  };

  const flattenMap = (item: RecordMap) => {
    const data = Array.from(item.values());
    const flattenedData = data.flat();
    return flattenedData;
  };

  if (isSearching) {
    return (
      <View style={[Styles.fullscreen, Styles.centerContent]}>
        <Text>Searching...</Text>
      </View>
    );
  }

  if (searchResultsMap === undefined) {
    return (
      <View
        style={[Styles.fullscreen, Styles.centerContent, Styles.pagePaddingX]}>
        <Text style={Styles.h3}>Welcome</Text>
        <Spacer height={12} />
        <Text style={Styles.textCenter}>
          Your search results will display here
        </Text>
      </View>
    );
  }

  if (searchResultsMap?.size === 0) {
    return (
      <View
        style={[Styles.fullscreen, Styles.centerContent, Styles.pagePaddingX]}>
        <Text style={[Styles.h3, Styles.textCenter]}>
          "{searchTerm}" does not match any {searchCriteria}
          {searchCriteria === 'address' && 'e'}s in our records
        </Text>
        <Spacer height={12} />
        <Text style={Styles.textCenter}>
          Try searching with another term or changing the search criteria
        </Text>
      </View>
    );
  }

  return (
    <View style={Styles.fullscreen}>
      <View style={[style.row, Styles.pagePaddingX]}>
        <View>
          <Text style={Styles.sectionHeading}>search results</Text>
        </View>

        <View style={[style.row, style.sortContainer]}>
          <Text style={Styles.subText}>Sort by </Text>
          <FilterDropdown
            value={sortCriteria}
            onChange={item => {
              const value = item.value;
              setSortCriteria(value);
              sortSearchResults(flattenMap(searchResultsMap!), value);
            }}
            buttonStyle={[style.buttonStyle]}
            renderLeftIcon={() => (
              <Text style={[Styles.subText, Styles.textCapitalize]}>
                {sortCriteria}
              </Text>
            )}
          />
        </View>
      </View>
      <Spacer height={8} />

      <FlatList
        data={searchResultsMap?.get(currentPage!)}
        renderItem={({item}) => <SearchResultCard key={item._id} user={item} />}
        contentContainerStyle={style.flatList}
      />

      {searchResultsMap !== undefined && searchResultsMap!.size > 0 && (
        <Paginator />
      )}
    </View>
  );
}

const style = StyleSheet.create({
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  sortContainer: {justifyContent: 'flex-start', gap: 8},

  buttonStyle: {
    paddingHorizontal: 8,
    height: 40,
    borderRadius: 12,
    borderColor: '#0808081A',
    borderWidth: 0.5,
  },

  flatList: {
    paddingBottom: 100,
    paddingTop: 8,
  },
});
