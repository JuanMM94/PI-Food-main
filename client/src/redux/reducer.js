import { GET_ALL_RECIPES, GET_RECIPE, CREATE_RECIPE, SET_RECIPES, SORT_RECIPES, FILTER_RECIPES, GET_ALL_DIETS } from "./constants";
import { alphabeticalAscending, alphabeticalDescending, healthScoreAscending, healthScoreDescending } from "../utils/constants";


const initialState = {
  recipes: [],
  diets: [],
  recipe: {},
  setrecipes: [],
  filterrecipes: []
};

const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ALL_RECIPES:
      return {
        ...state,
        recipes: action.payload,
        filterrecipes: action.payload
      };

    case GET_ALL_DIETS:
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
      let filteredRecipes = [...state.recipes];

/*       if (action.payload === 'none') {
        return filteredRecipes = [...state.recipes];
      }
      if (filteredRecipes.id.length > 15) {
        return filteredRecipes.diets.filter(el => el.name.includes(action.payload));
      }
      if (filteredRecipes.id.length <= 15) {
        return filteredRecipes.filter(el => el.diets.includes(action.payload));
      }  */
      filteredRecipes = action.payload === 'none'
      ? filteredRecipes
      : filteredRecipes.filter(el => el.diets.includes(action.payload))

      return {
        ...state,
        filterrecipes: filteredRecipes
      };

    case SORT_RECIPES:
      
      let sortedRecipes
      if (state.filterrecipes) sortedRecipes = [...state.filterrecipes];
      else sortedRecipes = [...state.recipes];

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
      };
      return {
        ...state,
        filterrecipes: sortedRecipes
      };

    default:
      return {
        ...state
      };
  };
};

export default rootReducer;
