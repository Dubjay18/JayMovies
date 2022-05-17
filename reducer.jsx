export const initialState = {
  user: null,
  uid: null,
  darkmode: true,
  page: 1,
  title: "Trending Now",
};
export const actionTypes = {
  SET_USER: "SET_USER",
  SET_UID: "SET_UID",
  SET_DARKMODE: "SET_DARKMODE",
  SET_PAGE: "SET_PAGE",
  SET_TITLE: "SET_TITLE",
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
    case actionTypes.SET_PAGE:
      return {
        ...state,
        page: action.page,
      };
    case actionTypes.SET_TITLE:
      return {
        ...state,
        title: action.title,
      };

    default:
      return state;
  }
};

export default reducer;
