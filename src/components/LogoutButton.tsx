import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button } from 'react-native';
import { useDispatch } from 'react-redux';

import { Paths } from '@/navigation/paths';

import { resetAccount } from '@/api';
import { queryClient } from '@/App';
import { logoutUser } from '@/redux/actions/userActions';

export default function LogoutButton() {
  const dispatch = useDispatch();
  const navigation = useNavigation<any>();

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
