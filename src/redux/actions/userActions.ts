export const saveUser = (user: any) => ({
  payload: user,
  type: 'SAVE_USER',
});
export const logoutUser = () => ({
  type: 'LOGOUT',
});
