import type { RootStackParamList } from '@/navigation/types';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import { useTheme } from '@/theme';
import useAppSelector from '@/hooks/useAppSelector';
import { Paths } from '@/navigation/paths';

import { Home, Login } from '@/screens';

import { selectUser } from '@/rtk/slice/user';

const Stack = createStackNavigator<RootStackParamList>();

function ApplicationNavigator() {
  const { navigationTheme, variant } = useTheme();
  const { isLoggedIn } = useAppSelector(selectUser);

  return (
    <SafeAreaProvider>
      <NavigationContainer theme={navigationTheme}>
        <Stack.Navigator
          key={variant}
          screenOptions={{ gestureEnabled: true, headerShown: false }}
        >
          {isLoggedIn ? (
            <Stack.Screen component={Home} name={Paths.Home} />
          ) : (
            <Stack.Screen component={Login} name={Paths.Login} />
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

export default ApplicationNavigator;
