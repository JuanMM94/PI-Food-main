import { useHistory } from "react-router-dom";
import './RecipeCard.css';

const RecipeCard = ({ renderRecipe }) => {

  const history = useHistory();
  const recipe = renderRecipe;

  const renderDiets = [];
  // if (recipe.vegetarian) renderDiets.push('Vegetarian');
  // if (recipe.vegan) renderDiets.push('Vegan');
  // if (recipe.glutenFree) renderDiets.push('Gluten Free');
  const recipeId = recipe.id;
  if (recipeId.toString().includes('-')) {
    recipe.diets.forEach(el => renderDiets.push(el.name))
  } else if (/\d*/.test(recipeId)) {
    recipe.diets.forEach((el) => renderDiets.push(`${el[0].toUpperCase()}${el.slice(1)}`));
  };

  return (

    <div className="background-image" style={{backgroundImage: `url(${recipe.image})`}} onClick={() => history.push(`/recipes/${recipe.id}`)}>
      <h4 className="title">{recipe.title}</h4>
      <h5 className="diets">{renderDiets.length > 0 
      ? renderDiets.reduce((prevValue, currValue, index) => {
        if (index < renderDiets.length) return prevValue.concat(`, ${currValue}`);
        return null;
      })
      : null
      }</h5>
      <h6 className="healthscore">{recipe.healthScore}</h6>
    </div>
    
  )
};

export default RecipeCard;

/* 
export class RecipeCard extends Component {


  render () {
    
    return (
      <>
      <div className="container">
        <div className="card">
          <Link className="link" to={`/recipes/${this.props.id}`}>
          <div className="backgroundImage" style={{backgroundImage: `url(${this.props.image})`}}>
            <div className="text">
              <h4>{this.props.title}</h4>
              <p></p>
            </div>
          </div>
          </Link>
        </div>
      </div>
      </>
    )
  }
}
*/