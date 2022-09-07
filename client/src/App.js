import { Route, Switch } from "react-router-dom";
import './App.css';
import Recipes from './components/Recipes/Recipes'
import RecipeDetail from './components/RecipeDetail/RecipeDetail';
import Home from './components/Home/Home';

function App() {
  return (
    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/recipes" component={Recipes} />
        <Route exact path="/recipes/:idRecipe" component={RecipeDetail} />
      </Switch>
    </div>
  );
}

export default App;
