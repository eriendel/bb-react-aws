import React from 'react';
import classes from './NavigationItems.css';
import NavigationItem from "./NavigationItem/NavigationItem";

const NavigationItems = ({isAuth}) => {
  return (
    <ul className={classes.NavigationItems}>
      <NavigationItem url="/" exact>Burger Builder</NavigationItem>
      { isAuth ? <NavigationItem url="/orders">Orders</NavigationItem> : null }
      {
        isAuth ?
          <NavigationItem url="/logout">Logout</NavigationItem> :
          <NavigationItem url="/auth">Authenticate</NavigationItem>
      }
    </ul>
  );
};

export default NavigationItems;
