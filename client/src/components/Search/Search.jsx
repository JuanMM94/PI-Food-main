import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { getAllRecipes } from "../../redux/actions";

const Search = () => {
  const dispatch = useDispatch();

  const [currentSearch, setCurrentSearch] = useState("");

  const handleChange = (event) => {
    const toLowerCase = event.target.value.toLowerCase().trim();
    setCurrentSearch(toLowerCase);
  };

  useEffect(() => {
    dispatch(getAllRecipes(currentSearch));
  }, [currentSearch, dispatch]);

  return (
    <div className="container-searchbar">
      <label htmlFor="search">Search recipes:</label>
      <input
        type="text"
        id="search"
        className="searchbar-input"
        onChange={(event) => handleChange(event)}
      />
    </div>
  );
};

export default Search;
