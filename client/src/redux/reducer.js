import { alphabeticalAscending, alphabeticalDescending, healthScoreAscending, healthScoreDescending } from "../utils/constants";
import { GET_ALL_RECIPES, GET_RECIPE, CREATE_RECIPE, SET_RECIPES, SORT_RECIPES, FILTER_RECIPES } from "./constants";


const initialState = {
  recipes: [],
  recipe: {},
  setrecipes: [],
  filterrecipes: [],
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

      console.log('sorted', sortedRecipes);
      
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
        sortrecipes: sortedRecipes
      };

    case FILTER_RECIPES:
      let filteredRecipes = [...state.sortrecipes];
      const input = [...action.payload];
    
      for (let i = 0; i < input.length; i++) {
        filteredRecipes = state.recipes.filter(el => el.diets.includes(input[i]));
      }
      return {
        ...state,
        filterrecipes: filteredRecipes
      };

    default:
      return {
        ...state
      };
  };
};

export default rootReducer;

/* 
input = [gluten free, ketogenic, vegan]
            ^

recipes = [...todaslasrecetas]

filteredRecipes = [recipes.filter(gluten free),recipes.filter(ketogenic),recipes.filter(vegan)]
*/
