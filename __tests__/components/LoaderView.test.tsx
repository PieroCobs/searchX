import 'react-native';
import React from 'react';
import {it} from '@jest/globals';
import {render} from '@testing-library/react-native';
import LoaderView from '../../src/components/LoaderView';

describe('LoaderView', () => {
  it('should render loader view', () => {
    const {getByTestId} = render(<LoaderView />);
    expect(getByTestId('loader-view')).toBeTruthy();
  });
});
