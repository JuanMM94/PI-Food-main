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
    return axios
      .get(`/recipes?name=${name}`)
      .then((response) => {
        const payload = response.data;
        dispatch({
          type: GET_ALL_RECIPES,
          payload,
        });
      })
      .catch((error) => console.log(error));
  } else {
    return axios
      .get(`/recipes`)
      .then((response) => {
        const payload = response.data;
        dispatch({
          type: GET_ALL_RECIPES,
          payload,
        });
      })
      .catch((error) => console.log(error));
  }
};

export const getAllDiets = () => (dispatch) => {
  return axios
    .get(`/diets`)
    .then((response) => {
      const payload = response.data;
      dispatch({
        type: GET_ALL_DIETS,
        payload,
      });
    })
    .catch((error) => console.log(error));
};

export const getRecipe = (id) => (dispatch) => {
  return axios
    .get(`/recipes/${id}`)
    .then((response) => {
      const payload = response.data;
      dispatch({
        type: GET_RECIPE,
        payload,
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
