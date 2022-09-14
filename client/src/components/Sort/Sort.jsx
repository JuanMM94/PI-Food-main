import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { sortRecipes } from "../../redux/actions";
import { alphabeticalAscending, alphabeticalDescending, healthScoreAscending, healthScoreDescending } from "../../utils/constants";
import './Sort.css';

const Sort = () => {

  const dispatch = useDispatch();
  const selectRecipes = useSelector((state) => state.filterrecipes);
  const selectAllRecipes = useSelector((state) => state.recipes);
  
  const [currentSort, setCurrentSort] = useState([]);
  const sortedRecipes = [...selectRecipes];

  useEffect(() => {
    setCurrentSort(selectAllRecipes.sort((a, b) => {
      if (a.title < b.title) return -1;
      if (a.title > b.title) return 1;
      return 0;
    }));
  }, []);

  console.log('selectRecipes', selectRecipes);

  const sortRecipesLocal = (event) => {
    switch (event.target.value) {
      case alphabeticalAscending:
        sortedRecipes.sort((a, b) => {
          if (a.title < b.title) return -1;
          if (a.title > b.title) return 1;
          return 0;
        });
        break;

      case alphabeticalDescending:
        sortedRecipes.sort((a, b) => {
          if (a.title < b.title) return 1;
          if (a.title > b.title) return -1;
          return 0;
        });
        break;

      case healthScoreAscending:
        sortedRecipes.sort((a, b) => {
          if (a.healthScore < b.healthScore) return -1;
          if (a.healthScore > b.healthScore) return 1;
          return 0;
        });
        break;

        case healthScoreDescending:
          sortedRecipes.sort((a, b) => {
            if (a.healthScore < b.healthScore) return 1;
            if (a.healthScore > b.healthScore) return -1;
            return 0;
          });
          break;

      default:
        sortedRecipes.sort((a, b) => {
          if (a.title < b.title) return -1;
          if (a.title > b.title) return 1;
          return 0;
        });
    };
    setCurrentSort(sortedRecipes);
  };

  useEffect(() => {
    dispatch(sortRecipes(currentSort));
  }, [currentSort, dispatch, selectRecipes]);
  
  return (
      
      <div className="container-sort">
        <label htmlFor="sort">Sort recipes:</label>
        <select name='sort' id='sort' onChange={sortRecipesLocal}>
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
  
  );
};

export default Sort;
