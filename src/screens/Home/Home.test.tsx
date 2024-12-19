import { configureStore } from '@reduxjs/toolkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react-native';
import { MMKV } from 'react-native-mmkv';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

import { ThemeProvider } from '@/theme';

import { rootReducer } from '@/rtk/store';

import Home from './Home';

// Mock the useNavigation hook
jest.mock('@react-navigation/native', () => {
  return {
    useNavigation: jest.fn(),
  };
});

jest.mock('@react-navigation/native', () => {
  const originalModule = jest.requireActual('@react-navigation/native');
  return {
    ...originalModule,
    // @ts-ignore
    NavigationContainer: ({ children, theme }) => (
      <div>{children}</div> // Just render the children to avoid rendering the actual container
    ),
  };
});

// Mock the useDispatch hook
jest.mock('react-redux', () => ({
  ...jest.requireActual('react-redux'),
  useDispatch: jest.fn(),
}));

jest.mock('@react-navigation/native', () => ({
  ...jest.requireActual('@react-navigation/native'),
  useNavigation: jest.fn(), // Mock useNavigation to return a mock function
}));

describe('Home screen should render correctly', () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      mutations: {
        gcTime: Infinity,
      },
      queries: {
        gcTime: Infinity,
        retry: false,
      },
    },
  });

  test('renders without crashing', () => {
    const storage = new MMKV();

    const mockStore = configureStore({
      preloadedState: {},
      reducer: rootReducer,
    });

    const component = (
      <SafeAreaProvider>
        <Provider store={mockStore}>
          <QueryClientProvider client={queryClient}>
            <ThemeProvider storage={storage}>
              <Home />
            </ThemeProvider>
          </QueryClientProvider>
        </Provider>
      </SafeAreaProvider>
    );

    const { getByTestId } = render(component);

    // Check if Home component renders a specific part of its UI
    expect(getByTestId('home-screen')).toBeTruthy();
  });
});
