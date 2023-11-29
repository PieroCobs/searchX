import 'react-native';
import React from 'react';
import {it} from '@jest/globals';
import {fireEvent, render} from '@testing-library/react-native';
import ErrorView from '../../src/components/ErrorView';

describe('ErrorView', () => {
  it('should render the error view', () => {
    const {getByTestId} = render(<ErrorView onRetry={jest.fn()} />);
    expect(getByTestId('error-view')).toBeTruthy();
  });

  it('should call onRetry when retry button is clicked', () => {
    const onRetry = jest.fn();
    const {getByTestId} = render(<ErrorView onRetry={onRetry} />);
    fireEvent.press(getByTestId('error-view-retry-button'));
    expect(onRetry).toHaveBeenCalled();
  });
});
