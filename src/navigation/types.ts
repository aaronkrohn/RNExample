import type { NavigationProp } from '@react-navigation/native';
import type { StackScreenProps } from '@react-navigation/stack';
import type { Paths } from '@/navigation/paths';

export type RootStackParamList = {
  [Paths.Home]: undefined;
  [Paths.Login]: undefined;
};

export type Navigation = NavigationProp<RootStackParamList>;

export type RootScreenProps<
  S extends keyof RootStackParamList = keyof RootStackParamList,
> = StackScreenProps<RootStackParamList, S>;
