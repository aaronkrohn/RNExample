import type { ThunkDispatch } from 'redux-thunk';
import type { RootState } from '@/rtk/store';

import { useDispatch } from 'react-redux';

const useAppDispatch = () => {
  return useDispatch<ThunkDispatch<RootState, null, any>>();
};

export default useAppDispatch;
