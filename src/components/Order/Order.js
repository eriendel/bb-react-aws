import React from 'react';
import classes from './Order.css';

const Order = ({ingredients, price}) => {
  let transformedIngredients = [];
  for(let iKey in ingredients) {
    transformedIngredients.push({
      name: iKey,
      amount: ingredients[iKey]
    });
  }

  transformedIngredients = transformedIngredients.map(ingredient => (
    <span key={ingredient.name} style={{
      textTransform: 'capitalize',
      display: 'inline-block',
      margin: '0 8px',
      border: '1px solid #ccc',
      padding: '4px'
    }}>
      {ingredient.name} ({ingredient.amount})
    </span>
  ));
  return (
    <div className={classes.Order}>
      <p>Ingredients: {transformedIngredients}</p>
      <p>Price: <strong>USD {+(price).toFixed(2)}</strong></p>
    </div>
  );
};

export default Order;
