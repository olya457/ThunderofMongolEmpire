/**
 * @format
 */

import React from 'react';
import ReactTestRenderer from 'react-test-renderer';

type MockMapProps = {
  children?: React.ReactNode;
};

jest.mock('@react-native-async-storage/async-storage', () =>
  require('@react-native-async-storage/async-storage/jest/async-storage-mock'),
);

jest.mock('react-native-maps', () => {
  const MockReact = require('react');
  const {View} = require('react-native');
  const MockMapView = ({children}: MockMapProps) =>
    MockReact.createElement(View, null, children);
  const MockMapItem = () => MockReact.createElement(View, null);

  return {
    __esModule: true,
    default: MockMapView,
    Marker: MockMapItem,
    Polygon: MockMapItem,
    PROVIDER_DEFAULT: undefined,
  };
});

jest.mock('../src/screens/LoaderScreen', () => {
  const MockReact = require('react');
  const {Text} = require('react-native');

  return {
    LoaderScreen: ({onFinished}: {onFinished: () => void}) => {
      MockReact.useEffect(() => {
        onFinished();
      }, [onFinished]);

      return MockReact.createElement(Text, null, 'Loader');
    },
  };
});

import App from '../App';

test('renders correctly', async () => {
  let renderer: ReactTestRenderer.ReactTestRenderer | undefined;

  await ReactTestRenderer.act(() => {
    renderer = ReactTestRenderer.create(<App />);
  });

  await ReactTestRenderer.act(async () => {
    await Promise.resolve();
  });

  await ReactTestRenderer.act(async () => {
    renderer?.unmount();
  });
});
