import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { setRecipes } from "../../redux/actions";

const Pagination = ({ recipes, setRecipes }) => {
  
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFistPost = indexOfLastPost - postsPerPage;
  const totalPages = Math.ceil(recipes.length / 9);
  const currentPosts = recipes.slice(indexOfFistPost, indexOfLastPost);

  function buttonClick (num) {
    setCurrentPage(num);
  }

  useEffect(() => {
    setRecipes (currentPosts);
  }, [currentPage, currentPosts, setRecipes])
  
  return (
    <div className="pagination-container">
      {
        Array(totalPages).fill().map((el, index) => (
          <button onClick={() => buttonClick (index + 1)} key={index}>{index + 1}</button>
        ))
      }
    </div>
  )
};

export const mapStateToProps = (state) => {
  return {
      recipes: state.recipes,
  }
};



export default connect(mapStateToProps, {setRecipes})(Pagination);
