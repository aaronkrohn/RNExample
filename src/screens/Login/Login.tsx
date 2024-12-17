import { Button, Text, View } from 'react-native';
import { connect } from 'react-redux';

import { useTheme } from '@/theme';
import { Paths } from '@/navigation/paths';

import { SafeScreen } from '@/components/templates';

import { login } from '@/api';
import { saveUser } from '@/redux/actions/userActions';

function Login({ navigation, saveUser, user }: any) {
  const { fonts, layout } = useTheme();
  const isUserLoggedIn = user?.isLoggedIn;
  console.log({ isUserLoggedIn });
  const navigatePostAppLogin = async () => {
    navigation.reset({
      index: 0,
      routes: [{ name: Paths.Home }],
    });
  };

  const doLogin = async () => {
    try {
      if (isUserLoggedIn) {
        // Suppose we'll run the biometrics here...
        navigatePostAppLogin();
        return;
      }
      const userData = await login();
      saveUser({ ...userData, isLoggedIn: true });
      navigatePostAppLogin();
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
        <Text style={[fonts.size_16, fonts.gray800]}>Hello, {user?.name}</Text>
        <Button
          onPress={doLogin}
          title={isUserLoggedIn ? 'Access your app' : 'Login'}
        />
      </View>
    </SafeScreen>
  );
}

const mapStateToProps = (state: any) => ({
  user: state.user,
});

const mapDispatchToProps = {
  saveUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
