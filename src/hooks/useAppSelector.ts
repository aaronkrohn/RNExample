import type { TypedUseSelectorHook } from 'react-redux';
import type { RootState } from '@/rtk/store';

import { useSelector } from 'react-redux';

const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default useAppSelector;
