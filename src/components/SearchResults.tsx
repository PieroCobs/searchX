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
  selectSearchCriteria,
  selectSearchTerm,
  updateSearchStatus,
} from '../redux/appSlice';
import {RecordMap, Records} from '../types/user';
import FilterCriteria from '../types/filter';
import Paginator from './Paginator';
import {PAGE_SIZE} from '../constants/numeric_constants';

type Props = {
  records: Records | undefined;
};

export default function SearchResults({records}: Props) {
  const [sortCriteria, setSortCriteria] = useState<FilterCriteria>();
  const isSearching = useAppSelector(selectIsSearching);
  const searchTerm = useAppSelector(selectSearchTerm);
  const searchCriteria = useAppSelector(selectSearchCriteria);
  const [searchResults, setSearchResults] = useState<RecordMap>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [numberOfPages, setNumberOfPages] = useState<number>(0);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSearching) {
      searchRecords();
      const delay = setTimeout(() => dispatch(updateSearchStatus(false)), 300);

      return () => clearTimeout(delay);
    }
  }, [isSearching]);

  const searchRecords = () => {
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
  };

  const sortSearchResults = (data: Records, sortBy?: FilterCriteria) => {
    let results: RecordMap;
    let pageCount: number;
    if (sortBy === undefined) {
      ({results, pageCount} = paginateData(data));
    } else {
      let sortedRecords: Records = [];
      if (sortCriteria === 'age') {
        sortedRecords = sortNumeric(data);
      } else {
        sortedRecords = sortAlphaNumeric(data, sortBy);
      }
      ({results, pageCount} = paginateData(sortedRecords));
    }
    setSearchResults(results);
    setNumberOfPages(pageCount);
    setCurrentPage(1);
  };

  const sortNumeric = (data: Records): Records => {
    let results = data;
    for (let i = results.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      let temp = results[i];
      results[i] = results[j];
      results[j] = temp;
    }
    return results;
  };

  const sortAlphaNumeric = (data: Records, sortBy: FilterCriteria): Records => {
    return data.sort((a, b) => {
      let x = a[sortBy].toString().toLowerCase();
      let y = b[sortBy].toString().toLowerCase();
      return x.localeCompare(y);
    });
  };

  const paginateData = (data: Records) => {
    const results = new Map();
    let pageCount = 0;
    for (let i = 0; i < data.length; i += PAGE_SIZE) {
      const page = data.slice(i, i + PAGE_SIZE);
      const pageNumber = i / PAGE_SIZE + 1;
      results.set(pageNumber, page);
    }
    pageCount = results.size;
    return {results, pageCount};
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

  if (searchResults === undefined) {
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

  if (searchResults?.size === 0) {
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
              sortSearchResults(flattenMap(searchResults!), value);
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
        data={searchResults?.get(currentPage!)}
        renderItem={({item}) => <SearchResultCard key={item._id} user={item} />}
        contentContainerStyle={style.flatList}
      />

      {searchResults !== undefined && searchResults!.size > 0 && (
        <Paginator
          currentPage={currentPage}
          numberOfPages={numberOfPages}
          decrementCurrentPage={() => setCurrentPage(cp => (cp -= 1))}
          incrementCurrentPage={() => setCurrentPage(cp => (cp += 1))}
        />
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
