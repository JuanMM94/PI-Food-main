import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllRecipes } from '../../redux/actions';
import RecipeCard from '../RecipeCard/RecipeCard';
import Nav from '../Nav/Nav';
import Pagination from '../Pagination/Pagination';
import './Recipes.css';

export class Recipes extends Component {
  constructor() {
    super()
    this.state = {loading: true}
  }

  componentDidUpdate() {
    if (this.state.loading) this.setState({loading: false});
  }

  componentDidMount() {
    this.props.getAllRecipes();
  }
  

  render() {
    if (this.state.loading) return <p>Loading...</p>
    return (
      <div className="container-recipes">
        <Nav />
        <br />
        {
          this.props.setrecipes &&
          this.props.setrecipes.map( (renderRecipe, index) => 
              <RecipeCard
                key={index}
                renderRecipe={renderRecipe}
                />
          )
        }
        <br />
        <Pagination recipes={this.props.recipes} />
      </div>
    );
  };
};

export const mapStateToProps = (state) => {
  return {
      recipes: state.recipes,
      setrecipes: state.setrecipes
  }
};

export const mapDispatchToProps = (dispatch) => {
  return {
      getAllRecipes: () => dispatch(getAllRecipes()),
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
