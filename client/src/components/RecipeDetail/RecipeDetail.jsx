import React from 'react';
import { getRecipe } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import RecipeCard from '../RecipeCard/RecipeCard';

const RecipeDetail = (props) => {
  const recipes = useSelector((state) => state.recipe);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getRecipe(props.match.params.idRecipe));
  });

  return (
    <div key={recipes.id}>
      <h3>{recipes.name}</h3>
      <img src={recipes.image} alt={recipes.title} />
      {recipes.diet?.map(value => (
        <RecipeCard
          key={value.id}
        />
      ))}
    </div>
  )
}

export default RecipeDetail;