export const initialState = {
  user: null,
  uid: null,
  darkmode: true,
};
export const actionTypes = {
  SET_USER: "SET_USER",
  SET_UID: "SET_UID",
  SET_DARKMODE: "SET_DARKMODE",
};

const reducer = (state, action) => {
  switch (action.type) {
    case actionTypes.SET_USER:
      return {
        ...state,
        user: action.user,
      };
    case actionTypes.SET_UID:
      return {
        ...state,
        uid: action.uid,
      };
    case actionTypes.SET_DARKMODE:
      return {
        ...state,
        darkmode: action.darkmode,
      };

    default:
      return state;
  }
};

export default reducer;
