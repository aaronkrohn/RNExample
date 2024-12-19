import type { Navigation } from '@/navigation/types';

import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button } from 'react-native';

import useAppDispatch from '@/hooks/useAppDispatch';
import { Paths } from '@/navigation/paths';

import { resetAccount } from '@/api';
import { queryClient } from '@/App';
import { logoutUser } from '@/rtk/slice/user';

export default function LogoutButton() {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<Navigation>();

  const handleLogout = async () => {
    await resetAccount();
    queryClient.clear();
    dispatch(logoutUser());
    // Clear token from keychain

    navigation.reset({
      index: 0,
      routes: [{ name: Paths.Login }],
    });
  };

  return <Button onPress={handleLogout} title="Logout" />;
}
