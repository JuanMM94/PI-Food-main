import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { filterRecipes } from "../../redux/actions";
import { glutenFree, ketogenic, lactoOvoVegetarian, vegan, pescetarian, paleo, primal, lowFODMAP, whole30 } from "../../utils/constants";
import './Filter.css';


const Filter = () => {

  const dispatch = useDispatch();
  const selectRecipes = useSelector(state => state.recipes);

  const [currentFilter, setCurrentFilter] = useState([]);
  let filteredRecipes = [...selectRecipes]; 

  useEffect(() => {
    setCurrentFilter(selectRecipes.sort((a, b) => {
      if (a.title < b.title) return -1;
      if (a.title > b.title) return 1;
      return 0;
    }));
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  
  function filterRecipesLocal (event) {
    if (event.target.checked) {
      setCurrentFilter(filteredRecipes.filter(el => el.diets.includes(event.target.value)));
    } else if (!event.target.checked) {
      setCurrentFilter([...selectRecipes]);
    };
  };

  useEffect(() => {
    dispatch(filterRecipes(currentFilter));
  }, [dispatch, currentFilter]);

  return (
      
      <div className="container-filter">
          <input type="checkbox" onChange={filterRecipesLocal} value={glutenFree} id={glutenFree} /><label htmlFor={glutenFree}>Gluten Free</label>
          <input type="checkbox" onChange={filterRecipesLocal} value={ketogenic} id={ketogenic} /><label htmlFor={ketogenic}>Ketogenic</label>
          <input type="checkbox" onChange={filterRecipesLocal} value={lactoOvoVegetarian} id={lactoOvoVegetarian} /><label htmlFor={lactoOvoVegetarian} >Lacto Ovo Vegetarian</label>
          <input type="checkbox" onChange={filterRecipesLocal} value={vegan} id={vegan} /><label htmlFor={vegan}>Vegan</label>
          <input type="checkbox" onChange={filterRecipesLocal} value={pescetarian} id={pescetarian} /><label htmlFor={pescetarian}>Pescetarian</label>
          <input type="checkbox" onChange={filterRecipesLocal} value={paleo} id={paleo} /><label htmlFor={paleo}>Paleo</label>
          <input type="checkbox" onChange={filterRecipesLocal} value={primal} id={primal} /><label htmlFor={primal}>Primal</label>
          <input type="checkbox" onChange={filterRecipesLocal} value={lowFODMAP} id={lowFODMAP} /><label htmlFor={lowFODMAP}>Low FODMAP</label>
          <input type="checkbox" onChange={filterRecipesLocal} value={whole30} id={whole30} /><label htmlFor={whole30}>Whole30</label>
      </div>
  
  );
};

export default Filter;
