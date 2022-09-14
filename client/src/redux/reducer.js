import { GET_ALL_RECIPES, GET_RECIPE, CREATE_RECIPE, SET_RECIPES, SORT_RECIPES, FILTER_RECIPES, GET_ALL_DIETS } from "./constants";


const initialState = {
  recipes: [],
  diets: [],
  recipe: {},
  setrecipes: [],
  filterrecipes: [],
  sortrecipes: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_RECIPES:
      return {
        ...state,
        recipes: action.payload
      };

    case GET_ALL_DIETS:

      console.log('payload', action.payload);
      
      return {
        ...state,
        diets: action.payload
      };

    case GET_RECIPE:
      return {
        ...state,
        recipe: action.payload
      };

    case CREATE_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload]
      };

    case SET_RECIPES:
      return {
        ...state,
        setrecipes: action.payload
      };

    case FILTER_RECIPES:
      return {
        ...state,
        filterrecipes: action.payload
      };

    case SORT_RECIPES:
      return {
        ...state,
        sortrecipes: action.payload
      };

    default:
      return {
        ...state
      };
  };
};

export default rootReducer;
