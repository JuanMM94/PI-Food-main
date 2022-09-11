import { useDispatch } from "react-redux";
import { sortRecipes } from "../../redux/actions";
import { alphabeticalAscending, alphabeticalDescending, healthScoreAscending, healthScoreDescending} from "../../utils/constants"

const Sort = () => {

  const dispatch = useDispatch();

  function sortedRecipes(event) {
    dispatch(sortRecipes(event.target.value));
  }

  return (
      
      <div className="container-sort">
        <label htmlFor="sort">Sort recipes:&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;</label>
        <select name='sort' id='sort' onChange={() => sortedRecipes}>
          <optgroup label="Alphabetical">
            <option value={alphabeticalAscending} defaultValue>Ascending [A-Z]</option>
            <option value={alphabeticalDescending}>Descending [Z-A]</option>
          </optgroup>
          <optgroup label="by Health Score">
            <option value={healthScoreAscending}>Ascending [0-100]</option>
            <option value={healthScoreDescending}>Descending [100-0]</option>
          </optgroup>
        </select>
      </div>
  
  )
};

export default Sort;