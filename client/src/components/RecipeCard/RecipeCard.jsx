import { useHistory } from "react-router-dom";
import './RecipeCard.css';

const RecipeCard = ({renderRecipe}) => {
  const history = useHistory();
  const recipe = renderRecipe;

  return (
    <div className="backgroundImage" style={{backgroundImage: `url(${recipe.image})`}} onClick={() => history.push(`/recipes/${recipe.id}`)}>
      <h4 className="title">{recipe.title}</h4>
      <h5 className="diets">ASDASD</h5>
    </div>
  )
}

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