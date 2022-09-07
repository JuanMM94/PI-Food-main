import React from 'react';
import { getRecipe } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import "./RecipeDetail.css"

const RecipeDetail = (props) => {
  const recipes = useSelector((state) => state.recipe);
  const dispatch = useDispatch();
  const history = useHistory();

  React.useEffect(() => {
    dispatch(getRecipe(props.match.params.idRecipe));
  }, [dispatch, props.match.params.idRecipe]);

  return (
    
    <div className="container-recipedetail" key={recipes.id}>
      <h3>{recipes.title}</h3>
      <img src={recipes.image} alt={recipes.title} />
      <div dangerouslySetInnerHTML={{ __html: recipes.summary }} />
      <button onClick={() => history.goBack()}>Back</button>
    </div>
    
  )
}

export default RecipeDetail;