import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { filterRecipes } from "../../redux/actions";
import {
  glutenFree,
  ketogenic,
  lactoOvoVegetarian,
  vegan,
  pescatarian,
  paleo,
  primal,
  lowFODMAP,
  whole30,
} from "../../utils/constants";
import "./Filter.css";

const Filter = () => {
  const dispatch = useDispatch();

  const [currentFilter, setCurrentFilter] = useState("none");

  function filterRecipesLocal(event) {
    setCurrentFilter(event.target.value);
  }

  useEffect(() => {
    dispatch(filterRecipes(currentFilter));
  }, [dispatch, currentFilter]);

  return (
    <div className="container-filter">
      <label className="label-filter">Filter recipes:</label>
      <select onChange={(event) => filterRecipesLocal(event)}>
        <option value="none" defaultValue>
          None
        </option>
        <option value={glutenFree} id={glutenFree}>
          Gluten Free
        </option>
        <option value={ketogenic} id={ketogenic}>
          Ketogenic
        </option>
        <option value={lactoOvoVegetarian} id={lactoOvoVegetarian}>
          Lacto Ovo Vegetarian
        </option>
        <option value={vegan} id={vegan}>
          Vegan
        </option>
        <option value={pescatarian} id={pescatarian}>
          Pescatarian
        </option>
        <option value={paleo} id={paleo}>
          Paleo
        </option>
        <option value={primal} id={primal}>
          Primal
        </option>
        <option value={lowFODMAP} id={lowFODMAP}>
          Low FODMAP
        </option>
        <option value={whole30} id={whole30}>
          Whole 30
        </option>
      </select>
    </div>
  );
};

export default Filter;
