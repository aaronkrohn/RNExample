import type { Navigation } from '@/navigation/types';

import { useNavigation } from '@react-navigation/native';
import { Button, Text, View } from 'react-native';

import { useTheme } from '@/theme';
import useAppDispatch from '@/hooks/useAppDispatch';
import useAppSelector from '@/hooks/useAppSelector';
import { Paths } from '@/navigation/paths';

import { SafeScreen } from '@/components/templates';

import { login } from '@/api';
import { saveUser, selectUser } from '@/rtk/slice/user';

function Login() {
  const { fonts, layout } = useTheme();
  const dispatch = useAppDispatch();
  const navigation = useNavigation<Navigation>();

  const { isLoggedIn, name } = useAppSelector(selectUser);

  const navigatePostAppLogin = () => {
    navigation.reset({
      index: 0,
      routes: [{ name: Paths.Home }],
    });
  };

  const doLogin = async () => {
    try {
      if (isLoggedIn) {
        // Suppose we'll run the biometrics here...
        navigatePostAppLogin();
        return;
      }
      const userData = await login();

      if (userData) {
        // NOTE: Look to save token return from BE into Keychain
        // await Keychain.setGenericPassword('auth', userData.token);
        dispatch(saveUser(userData));

        navigatePostAppLogin();
      }

      throw new Error('Login failed');
    } catch (error: any) {
      console.error(error?.message);
    }
  };

  return (
    <SafeScreen>
      <View
        style={[
          layout.flex_1,
          layout.col,
          layout.itemsCenter,
          layout.justifyCenter,
        ]}
      >
        <Text style={[fonts.size_16, fonts.gray800]}>Hello, {name}</Text>
        <Button
          onPress={doLogin}
          title={isLoggedIn ? 'Access your app' : 'Login'}
        />
      </View>
    </SafeScreen>
  );
}

export default Login;
