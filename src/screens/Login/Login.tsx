import { Button, Text, View } from 'react-native';
import { connect } from 'react-redux';

import { useTheme } from '@/theme';
import { Paths } from '@/navigation/paths';

import { SafeScreen } from '@/components/templates';

import { login } from '@/api';
import { saveUser } from '@/redux/actions/userActions';

function Login({ navigation, saveUser, user: { isLoggedIn, name } }: any) {
  const { fonts, layout } = useTheme();

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
        <Text style={[fonts.size_16, fonts.gray800]}>Hello, {name}</Text>
        <Button
          onPress={doLogin}
          title={isLoggedIn ? 'Access your app' : 'Login'}
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
