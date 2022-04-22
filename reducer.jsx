export const initialState = {
  user: null,
  uid: null,
};
export const actionTypes = {
  SET_USER: "SET_USER",
  SET_UID: "SET_UID",
};

const reducer = (state, action) => {
  console.log(action);
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

    default:
      return state;
  }
};

export default reducer;
