import React from "react";
import { Link, Route } from 'react-router-dom'
import PizzaApp from './PizzaApp'
import Pizza from './Pizza.jpg'


const App = () => {
  return (
    <>
      <nav className="navbar">
        <button><Link to="/">Home</Link></button>
        <button><Link to="/pizza">Order Pizza</Link></button>
      </nav>
      <h1>Lambda Eats</h1>
      <img src={Pizza} alt= "pizza"></img>
      <Route path="/pizza" component={PizzaApp}/>      
    </>
  );
};
export default App;
