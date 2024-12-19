import { configureStore } from '@reduxjs/toolkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render } from '@testing-library/react-native';
import { MMKV } from 'react-native-mmkv';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

import { ThemeProvider } from '@/theme';

import { rootReducer } from '@/rtk/store';

import Home from './Home';

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
      <Provider store={mockStore}>
        <SafeAreaProvider>
          <ThemeProvider storage={storage}>
            <QueryClientProvider client={queryClient}>
              <Home />
            </QueryClientProvider>
          </ThemeProvider>
        </SafeAreaProvider>
      </Provider>
    );

    const { getByTestId } = render(component);

    // Check if Home component renders a specific part of its UI
    expect(getByTestId('home-screen')).toBeTruthy();
  });
});
