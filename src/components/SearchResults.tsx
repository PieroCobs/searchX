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
import FilterCriteria, {FilterItem} from '../types/filter';
import Paginator from './Paginator';
import searchRecords from '../util/searchRecords';
import paginateData, {PaginatedData} from '../util/pagination';
import sortRecords from '../util/sortRecords';
import {convertMapToArray} from '../util/dataTransformation';

type Props = {
  records: Records;
};

export default function SearchResults({records}: Props) {
  const [sortCriteria, setSortCriteria] = useState<FilterCriteria>('name');
  const isSearching = useAppSelector(selectIsSearching);
  const searchTerm = useAppSelector(selectSearchTerm);
  const searchCriteria = useAppSelector(selectSearchCriteria);
  const [searchResults, setSearchResults] = useState<RecordMap>();
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [numberOfPages, setNumberOfPages] = useState<number>(0);
  const dispatch = useAppDispatch();

  useEffect(() => {
    let delay: NodeJS.Timeout;
    if (isSearching) {
      runSearch();
      delay = setTimeout(() => dispatch(updateSearchStatus(false)), 300);
    }
    return () => clearTimeout(delay);
  }, [isSearching]);

  const runSearch = () => {
    const results = searchRecords({records, searchTerm, searchCriteria});
    const sortedRecords = sortRecords({data: results, sortCriteria});
    const paginatedData = paginateData(sortedRecords);
    updateState(paginatedData);
  };

  const sortSearchResults = (criteria: FilterItem) => {
    const value = criteria.value;
    setSortCriteria(value);
    const sortedRecords = sortRecords({
      data: convertMapToArray(searchResults!),
      sortCriteria: value,
    });
    const paginatedData = paginateData(sortedRecords);
    updateState(paginatedData);
  };

  const updateState = (data: PaginatedData) => {
    setSearchResults(data.results);
    setNumberOfPages(data.numberOfPages);
    setCurrentPage(data.currentPage);
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
            onChange={sortSearchResults}
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
          decrementCurrentPage={page => setCurrentPage(page)}
          incrementCurrentPage={page => setCurrentPage(page)}
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
