import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems = () => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem url="/" active>Burger Builder</NavigationItem>
      <NavigationItem url="/">Checkout</NavigationItem>
    </ul>
  );
};

export default NavigationItems;
