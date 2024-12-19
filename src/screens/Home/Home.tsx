import { Button, ScrollView, Text, View } from 'react-native';

import { useTheme } from '@/theme';
import useAccount from '@/hooks/useAccount';
import useAppSelector from '@/hooks/useAppSelector';
import { useStatus } from '@/hooks/useStatus';

import { SafeScreen } from '@/components/templates';
import AccountBreakdown from '@/screens/Home/components/AccountBreakdown';
import AccountDetails from '@/screens/Home/components/AccountDetails';

import { createAccount } from '@/api';
import LogoutButton from '@/components/LogoutButton';
import { selectUser } from '@/rtk/slice/user';
import { calculateAccountBreakdown } from '@/utils/calculateAccountBreakdown';

function Home() {
  const {
    // backgrounds,
    // changeTheme,
    // colors,
    // components,
    fonts,
    gutters,
    layout,
  } = useTheme();

  const { data: account, invalidateAccountQuery, isLoading } = useAccount();
  const user = useAppSelector(selectUser);
  const { setStatus, status } = useStatus();
  const hasAccount = !!account;

  const handleCreateAccount = async () => {
    try {
      setStatus({ status: 'loading' });
      // token would be added to header on all requests to check session validity
      const account = await createAccount();
      console.log({ account });
      setStatus({ status: 'idle' });
    } catch {
      setStatus({ status: 'error' });
    }
  };

  const breakdown = calculateAccountBreakdown(account?.balance || 0);

  return (
    <SafeScreen testID="home-screen">
      <ScrollView>
        <View
          style={[
            layout.justifyCenter,
            layout.justifyBetween,
            gutters.marginTop_80,
            gutters.paddingHorizontal_16,
            gutters.gap_12,
          ]}
        >
          <Text style={[fonts.size_16, fonts.gray800]}>{user?.name},</Text>

          {isLoading ? (
            <Text style={[fonts.size_16, fonts.gray800]}>...</Text>
          ) : null}

          {hasAccount ? (
            <View style={[gutters.gap_12]}>
              <AccountDetails balance={account.balance} />
              <View style={[gutters.gap_12]}>
                <AccountBreakdown
                  balance={account.balance}
                  breakdown={breakdown}
                />
              </View>
            </View>
          ) : (
            <View style={[layout.itemsStart]}>
              <Text style={[fonts.size_16, fonts.gray800]}>
                You have no account, yet!
              </Text>
              <Button
                onPress={handleCreateAccount}
                title={
                  status === 'loading'
                    ? 'Creating your account...'
                    : 'Create one'
                }
              />
            </View>
          )}
          <Button
            onPress={invalidateAccountQuery}
            title={'Refresh your account'}
          />
          <LogoutButton />
        </View>
      </ScrollView>
    </SafeScreen>
  );
}

export default Home;
