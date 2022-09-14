import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from 'react-redux';
import { setRecipes } from "../../redux/actions";
import './Pagination.css';

const Pagination = () => {
  
  const dispatch = useDispatch();
  const selectRecipes = useSelector((state) => state.sortrecipes);
  
  const [currentPage, setCurrentPage] = useState(1);
  
  const postsPerPage = 9;
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const totalPages = Math.ceil(selectRecipes.length / postsPerPage);
  // const currentPosts = recipes.slice(indexOfFirstPost, indexOfLastPost);

  useEffect(() => {
    dispatch(setRecipes(selectRecipes.slice(indexOfFirstPost, indexOfLastPost)));
  }, [dispatch, indexOfFirstPost, indexOfLastPost, selectRecipes]);
  
  function buttonClick (num) {
    setCurrentPage(num);
  };
  
  return (

    <div className="container-pagination">
      {
        Array(totalPages).fill().map((el, index) => (
          <button className="button-pagination" onClick={() => buttonClick (index + 1)} key={index}>{index + 1}</button>
        ))
      }
    </div>

  )
};

export default Pagination;
