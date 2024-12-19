import type { CalculateAccountBreakdown } from '@/utils/calculateAccountBreakdown';

import { Text, View } from 'react-native';

import { useTheme } from '@/theme';

interface AccountBreakdownProps {
  balance: number;
  breakdown: CalculateAccountBreakdown;
}

const AccountBreakdown = ({ balance, breakdown }: AccountBreakdownProps) => {
  const { fonts, gutters } = useTheme();
  return (
    <View style={[gutters.gap_12]}>
      <Text style={[fonts.size_16, fonts.gray800, fonts.capitalize]}>
        Breakdown:
      </Text>
      <Text style={[fonts.size_16, fonts.gray800, fonts.capitalize]}>
        Monthly Interest: {breakdown?.interest}
      </Text>
      <Text style={[fonts.size_16, fonts.gray800, fonts.capitalize]}>
        Fees: {breakdown?.fees}
      </Text>
      <Text style={[fonts.size_16, fonts.gray800, fonts.capitalize]}>
        Taxes: {breakdown?.taxes}
      </Text>
      <Text style={[fonts.size_16, fonts.gray800, fonts.bold]}>
        Available balance: {breakdown?.availableBalance}
      </Text>
    </View>
  );
};

export default AccountBreakdown;
