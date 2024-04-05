const initialState = {
  theme: "light", // default theme
};

const themeReducer = (state = initialState, action) => {
  switch (action.type) {
    case "UPDATE_THEME":
      return {
        ...state,
        theme: action.payload,
      };
    default:
      return state;
  }
};

export default themeReducer;
