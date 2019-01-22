import React from 'react';
import classes from './BuildControls.css';
import BuildControl from "./BuildControl/BuildControl";

const controls = [
  {
    label: 'Salad',
    type: 'salad'
  },

  {
    label: 'Bacon',
    type: 'bacon'
  },
  {
    label: 'Cheese',
    type: 'cheese'
  },
  {
    label: 'Meat',
    type: 'meat'
  }
];

const BuildControls = ({disabledInfo, ingredientAdded, ingredientRemoved, totalPrice, purchaseable, startPurchasing}) => {
  return (
    <div className={classes.BuildControls}>
      <p>Burger Price is: <strong>{totalPrice.toFixed(2)}$</strong></p>
      {controls.map((_) => {
        return (<BuildControl disabled={disabledInfo[_.type]}
                              ingredientAdded={() => ingredientAdded(_.type)}
                              ingredientRemoved={() => ingredientRemoved(_.type)}
                              label={_.label} key={_.label}/>);
      })}
      <button className={classes.OrderButton}
              disabled={!purchaseable}
              onClick={startPurchasing}>ORDER NOW</button>
    </div>
  );
};

export default BuildControls;
