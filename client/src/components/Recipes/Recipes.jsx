import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllRecipes } from '../../redux/actions';
import RecipeCard from '../RecipeCard/RecipeCard';
import Nav from '../Nav/Nav';
import Pagination from '../Pagination/Pagination';
import Sort from '../Sort/Sort';
import Filter from '../Filter/Filter';
import './Recipes.css';

export class Recipes extends Component {
  constructor(props) {
    super()
    this.state = {
      loading: true,
      query: '',
      setrecipes: props.setrecipes,
      sortrecipes: props.sortrecipes,
      filterrecipes: props.filterrecipes
    };
  };

  componentDidUpdate() {
    if (this.state.loading) this.setState({loading: false});
  };

  componentDidMount() {
    this.props.getAllRecipes();
  };

  render() {
    

    if (this.state.loading) return <div className='loading'><p>Loading...</p></div>;

    return (
      <>
        <Nav />
        <div className='container-searchbar'>
          <Filter />
          <Sort />
          <div className='searchbar'>
          <label htmlFor='search'>Search recipes:</label>
          <input type='text' id='search' className='searchbar-input' value={this.state.query || ''} onChange={event => this.setState({ query: event.target.value })} />
          </div>
        </div>
        <div className="container-recipes">
         {
            this.state.query 
          ? this.props.recipes &&
            this.props.recipes
            .filter(el => el.title.toLowerCase().includes(this.state.query.toLowerCase()))
            .map( (renderRecipe, index) => 
                <RecipeCard
                  key={index}
                  renderRecipe={renderRecipe}
                  />
            )
          : this.props.setrecipes &&
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
      filterrecipes: state.filterrecipes,
      sortrecipes: state.sortrecipes
  };
};

export const mapDispatchToProps = (dispatch) => {
  return {
      getAllRecipes: () => dispatch(getAllRecipes()),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Recipes);
