import {
  GET_ALL_RECIPES,
  GET_ALL_DIETS,
  GET_RECIPE,
  CREATE_RECIPE,
  SET_RECIPES,
  SORT_RECIPES,
  FILTER_RECIPES,
} from "./constants";
import axios from "axios";

export const getAllRecipes = (name) => (dispatch) => {
  if (name) {
    const nameRecipes = fetch(`/recipes?name=${name}`);
    nameRecipes
      .then((res) => res.json())
      .then((json) => {
        dispatch({
          type: GET_ALL_RECIPES,
          payload: json,
        });
      })
      .catch((error) => console.log(error));
  } else {
    return fetch(`/recipes`)
      .then((res) => res.json())
      .then((json) => {
        dispatch({
          type: GET_ALL_RECIPES,
          payload: json,
        });
      })
      .catch((error) => console.log(error));
  }
};

export const getAllDiets = () => (dispatch) => {
  return fetch(`/diets`)
    .then((res) => res.json())
    .then((json) => {
      dispatch({
        type: GET_ALL_DIETS,
        payload: json,
      });
    })
    .catch((error) => console.log(error));
};

export const getRecipe = (id) => (dispatch) => {
  return fetch(`/recipes/${id}`)
    .then((res) => res.json())
    .then((json) => {
      dispatch({
        type: GET_RECIPE,
        payload: json,
      });
    })
    .catch((error) => console.log(error));
};

export const createRecipe = (createRecipe) => (dispatch) => {
  axios
    .post(`/recipes/create`, createRecipe)
    .then((json) => {
      dispatch({
        type: CREATE_RECIPE,
        payload: json,
      });
    })
    .catch((error) => console.log(error));
};

export const setRecipes = (setRecipes) => {
  return {
    type: SET_RECIPES,
    payload: setRecipes,
  };
};

export const sortRecipes = (sortRecipes) => {
  return {
    type: SORT_RECIPES,
    payload: sortRecipes,
  };
};

export const filterRecipes = (filterRecipes) => {
  return {
    type: FILTER_RECIPES,
    payload: filterRecipes,
  };
};
