import React from 'react';
import classes from './Burger.css';
import BurgerIngredient from "./BurgerIngredient/BurgerIngredient";

const Burger = ({ingredients}) => {
  let transformedIngredients = Object.keys(ingredients).map(iKey => {
    return [...Array(ingredients[iKey])].map((_, i) => {
      return <BurgerIngredient type={iKey} key={iKey + i}/>
    })
  }).reduce((arr, el) => arr.concat(el), []);
  if (transformedIngredients.length === 0) {
    transformedIngredients = <p>Please add some ingredients!</p>;
  }
  return (
    <div className={classes.Burger}>
      <BurgerIngredient type="bread-top"/>
      {transformedIngredients}
      <BurgerIngredient type="bread-bottom"/>
    </div>
  );
};

export default Burger;
