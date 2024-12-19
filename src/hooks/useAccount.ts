import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

import { getAccount } from '@/api';
import { queryClient } from '@/App';

const useAccount = () => {
  const [polling, setPolling] = useState(false); // State to control polling

  const queryFn = async () => {
    const account = await getAccount(); // Use your defined `getAccount` function
    return account;
  };

  const invalidateAccountQuery = () => {
    queryClient.invalidateQueries(['account'] as any);
  };

  const query = useQuery({
    queryFn,
    queryKey: ['account'],
    refetchInterval: polling ? 2000 : false, // Dynamically control polling
    refetchIntervalInBackground: true, // Keep polling in background
  });

  const startPolling = () => setPolling(true);
  const stopPolling = () => setPolling(false);

  return {
    invalidateAccountQuery,
    ...query,
    startPolling,
    stopPolling,
  };
};
export default useAccount;
