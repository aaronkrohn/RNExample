import { calculateAccountBreakdown } from '@/utils/calculateAccountBreakdown';

describe('calculateBreakdown', () => {
  test('should calculate breakdown correctly for a positive balance', () => {
    const balance = 100;

    const result = calculateAccountBreakdown(balance);

    expect(result).toEqual({
      availableBalance: '84.57',
      fees: '1.00',
      interest: '0.42',
      taxes: '14.85',
    });
  });

  test('should calculate breakdown correctly for a Zero balance', () => {
    const balance = 0;

    const result = calculateAccountBreakdown(balance);

    expect(result).toEqual({
      availableBalance: '0.00',
      fees: '0.00',
      interest: '0.00',
      taxes: '0.00',
    });
  });

  test('should calculate breakdown correctly for a Negative balance', () => {
    const balance = -10;

    const result = calculateAccountBreakdown(balance);

    // Note: I'd want clarity on how to handle interest rates on negative balances
    expect(result).toEqual({
      availableBalance: '-8.46',
      fees: '-0.10',
      interest: '-0.04',
      taxes: '-1.49',
    });
  });

  test('should calculate breakdown correctly for a Small Positive balance', () => {
    const balance = 0.2;

    const result = calculateAccountBreakdown(balance);

    // Note: I'd want clarity on how to handle interest rates on negative balances
    expect(result).toEqual({
      availableBalance: '0.17',
      fees: '0.00',
      interest: '0.00',
      taxes: '0.03',
    });
  });
});
