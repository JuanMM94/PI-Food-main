import React, { Component } from 'react';
import { connect } from 'react-redux';
import RecipeCard from '../RecipeCard/RecipeCard';
import Nav from '../Nav/Nav';
import Pagination from '../Pagination/Pagination';
import Sort from '../Sort/Sort';
import Filter from '../Filter/Filter';
import './Recipes.css';
import Search from '../Search/Search';

export class Recipes extends Component {
  constructor(props) {
    super()
    this.state = {
      loading: true,
      query: '',
      recipes: props.recipes,
      setrecipes: props.setrecipes,
    };
  };

  componentDidUpdate() {
    if (this.state.loading) this.setState({loading: false});
  };

  render() {
    

    if (this.state.loading) return <div className='loading'><p>Loading...</p></div>;

    return (
      <>
        <Nav />
        <div className='container-searchbar'>
          <Filter />
          <Sort />
          <Search />
        </div>
        <div className="container-recipes">
         {
            this.props.setrecipes &&
            this.props.setrecipes
            .map( (renderRecipe, index) => 
              <RecipeCard
                key={index}
                renderRecipe={renderRecipe}
                />
            )
          }
        </div>
        <Pagination recipes={this.props.recipes} />
      </>
    );
  };
};

export const mapStateToProps = (state) => {
  return {
      recipes: state.recipes,
      setrecipes: state.setrecipes,
  };
};

/* export const mapDispatchToProps = (dispatch) => {
  return {
      getAllRecipes: () => dispatch(getAllRecipes()),
  };
}; */

export default connect(mapStateToProps, null)(Recipes);
