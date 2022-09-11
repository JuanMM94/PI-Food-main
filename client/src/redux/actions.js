import { GET_ALL_RECIPES, GET_RECIPE, CREATE_RECIPE, SET_RECIPES, SORT_RECIPES } from "./constants";

export const getAllRecipes = () => dispatch => {
  return fetch(`http://localhost:3001/api/recipes`)
    .then((res) => res.json())
    .then(json => {
      dispatch({
        type: GET_ALL_RECIPES,
        payload: json,
      })
    })
};

export const getRecipe = (id) => dispatch => {
  return fetch(`http://localhost:3001/api/recipes/${id}`)
    .then((res) => res.json())
    .then(json => {
      dispatch({
        type: GET_RECIPE,
        payload: json,
      })
    })
};

export const createRecipe = (createRecipe) => {
  return {
    type: CREATE_RECIPE,
    payload: createRecipe,
  }
};

export const setRecipes = (setRecipes) => {
  return {
    type: SET_RECIPES,
    payload: setRecipes
  }
};

export const sortRecipes = (sortRecipes) => {
  return {
    type: SORT_RECIPES,
    payload: sortRecipes
  }
}