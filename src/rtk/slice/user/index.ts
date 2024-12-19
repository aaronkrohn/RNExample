import type { RootState } from '@/rtk/store';

import { createSlice } from '@reduxjs/toolkit';

export interface UserState {
  emailAddress: null | string;
  id: null | string;
  isLoggedIn: boolean;
  name: null | string;
}

const initialState: UserState = {
  emailAddress: null,
  id: null,
  isLoggedIn: false,
  name: null,
};

const userSlice = createSlice({
  initialState,
  name: 'user',
  reducers: {
    logoutUser: () => {
      return initialState;
    },
    saveUser: (state, action) => {
      return {
        ...state,
        ...action.payload,
        isLoggedIn: true,
      };
    },
  },
});

export const selectUser = (state: RootState) => state.user;

export const { logoutUser, saveUser } = userSlice.actions;

export default userSlice.reducer;
