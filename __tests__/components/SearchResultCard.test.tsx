import 'react-native';
import React from 'react';
import {it} from '@jest/globals';
import {render} from '@testing-library/react-native';
import SearchResultCard from '../../src/components/SearchResultCard';
import {NavigationContainer} from '@react-navigation/native';

describe('SearchResultCard', () => {
  it('should render a search result card', () => {
    const user = {
      _id: '1',
      name: 'Peter Sabla',
      age: 29,
      email: 'rickpiero237@gmail.com',
      address: 'Adenta',
      phone: '0255555555',
    };
    const {getByTestId, getByText} = render(
      <NavigationContainer>
        <SearchResultCard user={user} />
      </NavigationContainer>,
    );
    expect(getByTestId('search-result')).toBeTruthy();
    expect(getByText(/Peter Sabla/)).toBeTruthy();
    expect(getByText(/rickpiero237@gmail.com/)).toBeTruthy();
    expect(getByText(/Adenta/)).toBeTruthy();
  });
});
