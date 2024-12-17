const initialState = {
  emailAddress: null,
  id: null,
  isLoggedIn: false,
  name: null,
};

const userReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case 'LOGOUT':
      return {
        ...initialState,
      };
    case 'SAVE_USER':
      return {
        ...state,
        ...action.payload, // Save the user data
      };
    default:
      return state;
  }
};

export default userReducer;
