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
      <button onClick={() => history.goBack()}>Back</button>
      <h3 className='detail-title'>{recipes.title}</h3>
      <img className='detail-img' src={recipes.image} alt={recipes.title} />
      <div className='detail-summary' dangerouslySetInnerHTML={{ __html: recipes.summary }} />
    </div>
    </>
    
  )
}

export default RecipeDetail;
