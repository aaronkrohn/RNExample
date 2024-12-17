import { useState } from 'react';

type Status = 'error' | 'idle' | 'loading' | 'success';
type StatusState = {
  status: Status;
  /**
   * The data here is the data related to the status.
   * When the status is "error" we have any infos related to this error in this data and ...etc.
   */
  data?: any | null;
};

export function useStatus(
  defaultStatus: StatusState = { data: null, status: 'idle' },
) {
  const [state, setState] = useState<StatusState>(defaultStatus);

  return { ...state, setStatus: setState };
}
