import React, { useState, useEffect } from "react";
import { connect } from 'react-redux';
import { setRecipes } from "../../redux/actions";
import './Pagination.css';

const Pagination = ({ recipes, setRecipes }) => {
  
  const [currentPage, setCurrentPage] = useState(1);
  const postsPerPage = 9;

  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const totalPages = Math.ceil(recipes.length / postsPerPage);
  const currentPosts = recipes.slice(indexOfFirstPost, indexOfLastPost);
  
  useEffect(() => {
    setRecipes (currentPosts);
  }, [currentPage, currentPosts, setRecipes])
  
  function buttonClick (num) {
    setCurrentPage(num);
  }
  
  return (
    <div className="container-pagination">
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

export default connect(mapStateToProps, { setRecipes })(Pagination);
