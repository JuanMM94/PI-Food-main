import { Route, Switch } from "react-router-dom";
import './App.css';
import Home from './components/Home/Home';
import Recipes from './components/Recipes/Recipes'
import RecipeDetail from './components/RecipeDetail/RecipeDetail';
import Form from "./components/Form/Form";

function App() {
  return (

    <div className="App">
      <Switch>
        <Route exact path="/" component={Home} />
        <Route exact path="/recipes" component={Recipes} />
        <Route exact path="/recipes/:idRecipe" component={RecipeDetail} />
        <Route exact path="/create" component={Form} />
      </Switch>
    </div>
    
  );
}

export default App;
