import { alphabeticalAscending, alphabeticalDescending } from "../utils/constants";
import { GET_ALL_RECIPES, GET_RECIPE, CREATE_RECIPE, SET_RECIPES, SORT_RECIPES } from "./constants";


const initialState = {
  recipes: [],
  recipe: {},
  setrecipes: [],
  sortrecipes: []
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

    case SORT_RECIPES:
      const sortedRecipes = [...state.recipes];
      
      switch (action.payload) {

        case alphabeticalAscending:
          sortedRecipes.sort((a, b) => {
            if (a.title < b.title) return -1;
            if (a.title > b.title) return 1;
            return 0;
          });
          break;

        case alphabeticalDescending:
          sortedRecipes.sort((a, b) => {
            if (a.title < b.title) return 1;
            if (a.title > b.title) return -1;
            return 0;
          });
          break;

        default:
          sortedRecipes.sort((a, b) => {
            if (a.title < b.title) return -1;
            if (a.title > b.title) return 1;
            return 0;
          });
      }

      return {
        ...state,
        sortrecipes: sortedRecipes
      }

    default:
      return {
        ...state
      };
  };
};

export default rootReducer;
