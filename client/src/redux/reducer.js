import {
  GET_ALL_RECIPES,
  GET_ALL_DIETS,
  GET_RECIPE,
  CREATE_RECIPE,
  SET_RECIPES,
  SORT_RECIPES,
  FILTER_RECIPES,
  SEARCH_RECIPES,
} from "./constants";
import {
  alphabeticalAscending,
  alphabeticalDescending,
  healthScoreAscending,
  healthScoreDescending,
} from "../utils/constants";

const initialState = {
  recipes: [],
  recipe: {},
  setrecipes: [],
  filterrecipes: [],
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        filterrecipes: action.payload,
      };

    case GET_ALL_DIETS:
      return {
        ...state,
        diets: action.payload,
      };

    case GET_RECIPE:
      return {
        ...state,
        recipe: action.payload,
      };

    case CREATE_RECIPE:
      return {
        ...state,
        recipes: [...state.recipes, action.payload],
      };

    case SET_RECIPES:
      return {
        ...state,
        setrecipes: action.payload,
      };

    case FILTER_RECIPES:
      return {
        ...state,
        filterrecipes: action.payload,
      };

    case SORT_RECIPES:
      const sortedRecipes = [];

      if (state.filterrecipes) sortedRecipes.push(...state.filterrecipes);
      else sortedRecipes.push(...state.recipes);

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

        case healthScoreAscending:
          sortedRecipes.sort((a, b) => {
            if (a.healthScore < b.healthScore) return -1;
            if (a.healthScore > b.healthScore) return 1;
            return 0;
          });
          break;

        case healthScoreDescending:
          sortedRecipes.sort((a, b) => {
            if (a.healthScore < b.healthScore) return 1;
            if (a.healthScore > b.healthScore) return -1;
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
        filterrecipes: sortedRecipes,
      };

    case SEARCH_RECIPES:
      const searchedRecipes = [];

      if (action.payload.trim() === "" && state.filterrecipes)
        searchedRecipes.push(
          ...state.filterrecipes.filter((el) =>
            el.title.toLowerCase().includes(action.payload)
          )
        );
      else searchedRecipes.push(...state.filterrecipes);

      return {
        ...state,
        filterrecipes: searchedRecipes,
      };

    default:
      return {
        ...state,
      };
  }
};

export default rootReducer;
