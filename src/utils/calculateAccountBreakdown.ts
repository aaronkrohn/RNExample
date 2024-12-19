export interface CalculateAccountBreakdown {
  availableBalance: string;
  fees: string;
  interest: string;
  taxes: string;
}

const toTwoDecimalPlaces = (value: number): string => value.toFixed(2);

export const calculateAccountBreakdown = (
  balance: number,
): CalculateAccountBreakdown => {
  const taxRate = 0.15;
  const reasonablePercentage = 0.01;
  const annualRate = 0.05;
  const monthlyRate = annualRate / 12;

  const interest = balance * monthlyRate;
  const fees = balance * reasonablePercentage;
  const netBalanceAfterFees = balance - fees;
  const taxes = netBalanceAfterFees * taxRate;
  const availableBalance = balance - (fees + taxes) + interest;

  return {
    // NOTE: Truncated to 2 decimal places (string) to display only.
    // Values above have been kept as numbers for precision
    availableBalance: toTwoDecimalPlaces(availableBalance),
    fees: toTwoDecimalPlaces(fees),
    interest: toTwoDecimalPlaces(interest),
    taxes: toTwoDecimalPlaces(taxes),
  };
};
