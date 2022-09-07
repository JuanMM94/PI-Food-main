import { GET_ALL_RECIPES, GET_RECIPE, CREATE_RECIPE, SET_RECIPES } from "./constants";


const initialState = {
  recipes: [],
  recipe: {},
  setrecipes: []
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_RECIPES:
      return {
        ...state,
        recipes: action.payload
      };

    case GET_RECIPE:
      return {
        ...state,
        recipe: action.payload
      }

    case CREATE_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };

    case SET_RECIPES:
      return {
        ...state,
        setrecipes: action.payload
      }

    default:
      return {
        ...state
      };
  };
};

export default rootReducer;
