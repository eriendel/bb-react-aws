import React from 'react';
import Button from "../../UI/Button/Button";

const OrderSummary = ({ingredients, doCancel, doContinue, price}) => {
  const ingredientSummary = Object.keys(ingredients).map((iKey) => {
    return <li key={iKey}><span style={{textTransform: 'capitalize'}}>{iKey}</span>: {ingredients[iKey]}</li>;
  });
  return (
    <>
      <h3>Your Order Is </h3>
      <p>A Delicious Burger containing the following Ingredients: </p>
      <ul>
        {ingredientSummary}
      </ul>
      <p><strong>Total Price is: {price.toFixed(2)}$</strong></p>
      <p>Continue to Checkout?</p>
      <Button btnType="Danger" clicked={doCancel}>CANCEL</Button>
      <Button btnType="Success" clicked={doContinue}>CONTINUE</Button>
    </>
  );
};

export default OrderSummary;
