import { GET_ALL_RECIPES, GET_RECIPE, CREATE_RECIPE } from "./constants";

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

export const createRecipe = (recipeCreated) => {
  let id = 0;
  id++;
  recipeCreated.id = id;
  return {
    type: CREATE_RECIPE,
    payload: recipeCreated,
  }
};