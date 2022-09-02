import { GET_ALL_RECIPES, GET_RECIPE, CREATE_RECIPE } from "./constants";


const initialState = {
  recipes: [],
  recipe: {},
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_RECIPES:
      return {
        ...state,
        houses: action.payload,
      };

    case GET_RECIPE:
      return {
        ...state,
        house: action.payload,
      }

    case CREATE_RECIPE:
      return {
        ...state,
        houses: [...state.houses, action.payload],
      };

    default:
      return {
        ...state,
      };
  };
};

export default rootReducer;
