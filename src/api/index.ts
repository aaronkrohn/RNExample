import logger from './logger';

const sleep = (ms: any) => new Promise((resolve) => setTimeout(resolve, ms));

export const login = async () => {
  try {
    await sleep(1000);

    return {
      emailAddress: 'joe@test.com',
      id: 1,
      name: 'Joe Davis',
    };
  } catch (error: any) {
    logger.error(error);
  }
};

type Account = {
  balance: number;
  createdAt: null | number;
  status: 'completed' | 'pending';
  version: 'v1' | 'v2';
};

let mockAccount: Account | null = null;

export const createAccount = async (): Promise<Account> => {
  try {
    await sleep(500);
    mockAccount = {
      balance: 0,
      createdAt: Date.now(),
      status: 'pending',
      version: 'v1',
    };

    return mockAccount;
  } catch (error: any) {
    logger.error(error);
    throw new Error('Failed to create account');
  }
};

export const resetAccount = async () => {
  mockAccount = null;
};

export const getAccount = async (
  getNewerAccountVersion?: boolean,
): Promise<Account> => {
  try {
    await sleep(500);

    if (!mockAccount) {
      throw new Error('Account not found');
    }

    const createdTime = mockAccount?.createdAt || Date.now();

    // Simulate status update to "completed" after 10 seconds
    if (mockAccount.status === 'pending' && Date.now() - createdTime > 10_000) {
      mockAccount.status = 'completed';
    }
    if (mockAccount.status === 'completed') {
      mockAccount.balance = mockAccount?.balance + 100;
    }

    return {
      ...mockAccount,
      version: getNewerAccountVersion ? 'v2' : mockAccount?.version,
    };
  } catch (error: any) {
    logger.error(error);
    throw new Error('Failed to retrieve account');
  }
};
