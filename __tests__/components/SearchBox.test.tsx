import 'react-native';
import React from 'react';
import {it} from '@jest/globals';
import {render} from '@testing-library/react-native';
import SearchView from '../../src/components/SearchBox';
import {Provider} from 'react-redux';
import configureStore from 'redux-mock-store';

const mockStore = configureStore([]);
//ES6 modules

describe('SearchView', () => {
  const store = mockStore({
    app: {
      searchTerm: '',
    },
  });
  const renderComponent = () => {
    return render(
      <Provider store={store}>
        <SearchView />
      </Provider>,
    );
  };
  it('should render search view', () => {
    const {getByTestId} = renderComponent();
    expect(getByTestId('search-view')).toBeTruthy();
  });
});
