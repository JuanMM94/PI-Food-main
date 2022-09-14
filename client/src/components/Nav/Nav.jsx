import { Link } from 'react-router-dom';
import './Nav.css';

const Nav = () => {

  return (

      <nav className='container-nav'>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/recipes">Recipes</Link></li>
          <li><Link to="/create">Create a recipe</Link></li>
        </ul>
      </nav>

  )
};

export default Nav;
