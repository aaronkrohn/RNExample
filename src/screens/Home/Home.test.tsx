import { configureStore } from '@reduxjs/toolkit';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { fireEvent, render, waitFor } from '@testing-library/react-native';
import { MMKV } from 'react-native-mmkv';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Provider } from 'react-redux';

import { ThemeProvider } from '@/theme';
import useAccount from '@/hooks/useAccount';

import { rootReducer } from '@/rtk/store';

import Home from './Home';

const useAccountMock = useAccount as jest.Mock;

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

jest.mock('@/hooks/useAccount');

describe('<Home />', () => {
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

  beforeEach(() => {
    jest.clearAllMocks();
    useAccountMock.mockReset();
  });

  test('should display "loading screen" state', () => {
    const storage = new MMKV();

    useAccountMock.mockReturnValue({
      data: null,
      invalidateAccountQuery: jest.fn(),
      isFetchedAfterMount: false,
      isLoading: true,
      startPolling: jest.fn(),
      stopPolling: jest.fn(),
    });

    const mockStore = configureStore({
      preloadedState: {
        user: {
          emailAddress: 'aaron@hotmail.com',
          id: 'id',
          isLoggedIn: true,
          name: 'Aaron',
        },
      },
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

    const { getByTestId, getByText } = render(component);

    expect(getByTestId('home-screen')).toBeTruthy();

    expect(getByText(/Aaron/)).toBeVisible();
    expect(getByText(`Loading you're account`)).toBeVisible();

    expect(getByText(`Logout`)).toBeVisible();
  });

  test('should display "No account" state', () => {
    const storage = new MMKV();

    useAccountMock.mockReturnValue({
      data: null,
      invalidateAccountQuery: jest.fn(),
      isFetchedAfterMount: false,
      isLoading: false,
      startPolling: jest.fn(),
      stopPolling: jest.fn(),
    });

    const mockStore = configureStore({
      preloadedState: {
        user: {
          emailAddress: 'aaron@hotmail.com',
          id: 'id',
          isLoggedIn: true,
          name: 'Aaron',
        },
      },
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

    const { getByTestId, getByText } = render(component);

    expect(getByTestId('home-screen')).toBeTruthy();

    expect(getByText(/Aaron/)).toBeVisible();
    expect(getByText(`You have no account, yet!`)).toBeVisible();
    expect(getByText(`Create one`)).toBeVisible();

    expect(getByText(`Logout`)).toBeVisible();
  });

  test('should display "Creating account" state', () => {
    const storage = new MMKV();

    useAccountMock.mockReturnValue({
      data: null,
      invalidateAccountQuery: jest.fn(),
      isFetchedAfterMount: false,
      isLoading: false,
      startPolling: jest.fn(),
      stopPolling: jest.fn(),
    });

    const mockStore = configureStore({
      preloadedState: {
        user: {
          emailAddress: 'aaron@hotmail.com',
          id: 'id',
          isLoggedIn: true,
          name: 'Aaron',
        },
      },
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

    const { getByTestId, getByText } = render(component);

    expect(getByTestId('home-screen')).toBeTruthy();

    expect(getByText(/Aaron/)).toBeVisible();
    expect(getByText(`You have no account, yet!`)).toBeVisible();
    expect(getByText(`Create one`)).toBeVisible();

    fireEvent.press(getByText(`Create one`));
    expect(getByText('Creating your account...')).toBeVisible();

    expect(getByText(`Logout`)).toBeVisible();
  });

  test('should display "process" state', async () => {
    const storage = new MMKV();

    useAccountMock.mockImplementationOnce(() => ({
      data: { balance: 400, status: 'pending' },
      invalidateAccountQuery: jest.fn(),
      isFetchedAfterMount: true,
      isLoading: false,
      startPolling: jest.fn(),
      stopPolling: jest.fn(),
    }));

    const mockStore = configureStore({
      preloadedState: {
        user: {
          emailAddress: 'aaron@hotmail.com',
          id: 'id',
          isLoggedIn: true,
          name: 'Aaron',
        },
      },
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

    const { getByTestId, getByText } = render(component);

    expect(getByTestId('home-screen')).toBeTruthy();

    expect(getByText(/Aaron/)).toBeVisible();

    await waitFor(() => getByText('Processing account'));

    expect(getByText(`Logout`)).toBeVisible();
  });

  test('should display "Account info" state', async () => {
    const storage = new MMKV();

    useAccountMock.mockImplementationOnce(() => ({
      data: { balance: 100, status: 'completed' },
      invalidateAccountQuery: jest.fn(),
      isFetchedAfterMount: true,
      isLoading: false,
      startPolling: jest.fn(),
      stopPolling: jest.fn(),
    }));

    const mockStore = configureStore({
      preloadedState: {
        user: {
          emailAddress: 'aaron@hotmail.com',
          id: 'id',
          isLoggedIn: true,
          name: 'Aaron',
        },
      },
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

    const { getByTestId, getByText } = render(component);

    expect(getByTestId('home-screen')).toBeTruthy();

    expect(getByText(/Aaron/)).toBeVisible();

    expect(getByText('Your account details:')).toBeVisible();
    expect(getByText('Balance: 100')).toBeVisible();

    expect(getByText('Breakdown:')).toBeVisible();
    expect(getByText('Monthly Interest: 0.42')).toBeVisible();
    expect(getByText('Fees: 1.00')).toBeVisible();
    expect(getByText('Taxes: 14.85')).toBeVisible();
    expect(getByText('Available balance: 84.57')).toBeVisible();

    expect(getByText(`Logout`)).toBeVisible();
  });
});
