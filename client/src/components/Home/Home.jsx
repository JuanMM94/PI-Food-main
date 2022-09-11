import React from "react";
import { useHistory } from "react-router-dom";
import './Home.css';


const Home = () => {
  
  const history = useHistory();

  return (
      
      <div className="container-home">
        <h1 className="welcome-home">Welcome to my Food project!</h1>
        <button className="button-home" onClick={() => history.push(`/recipes`)}>Enter</button>
      </div>
  
  )
};

export default Home;
