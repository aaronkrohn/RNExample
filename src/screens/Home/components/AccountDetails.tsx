import { Text, View } from 'react-native';

import { useTheme } from '@/theme';

interface AccountDetailsProps {
  balance: number;
}

const AccountDetails = ({ balance }: AccountDetailsProps) => {
  const { fonts, gutters } = useTheme();
  return (
    <View style={[gutters.gap_12]}>
      <Text style={[fonts.size_16, fonts.gray800]}>You account details:</Text>
      <Text style={[fonts.size_16, fonts.gray800, fonts.bold]}>
        Balance: {balance}
      </Text>
    </View>
  );
};

export default AccountDetails;
