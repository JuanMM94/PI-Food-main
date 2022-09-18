import React from 'react';
import { getRecipe } from '../../redux/actions';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import Nav from '../Nav/Nav';
import "./RecipeDetail.css"

const RecipeDetail = (props) => {
  const recipes = useSelector((state) => state.recipe);
  const dispatch = useDispatch();
  const history = useHistory();

  React.useEffect(() => {
    dispatch(getRecipe(props.match.params.idRecipe));
  }, [dispatch, props.match.params.idRecipe]);

  return (
    
    <>
    <Nav />
    <div className="container-recipedetail" key={recipes.id}>
      <h1 className='detail-title'>{recipes.title}</h1>
      <p className='detail-healthscore'>Health Score <sup>{recipes.healthScore}</sup></p>
      <img className='detail-img' src={recipes.image} alt={recipes.title} />
      <p className='detail-summary' dangerouslySetInnerHTML={{ __html: recipes.summary }} />
      <p className='detail-step'>{
        typeof recipes.analyzedInstructions !== 'undefined' && recipes.analyzedInstructions.length > 0
        ? recipes.analyzedInstructions[0].steps.map(el => el.step).join(' ') 
        : recipes.steps && recipes.steps.length > 0
        ? recipes.steps
        : null
      }</p>
      <button className='detail-button' onClick={() => history.goBack()}>Back</button>
    </div>
    </>
    
  )
}

export default RecipeDetail;
