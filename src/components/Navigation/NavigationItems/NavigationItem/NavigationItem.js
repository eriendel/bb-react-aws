import React from 'react';
import classes from './NavigationItem.css';
import {NavLink} from 'react-router-dom';

const NavigationItem = ({url, exact, children}) => {
  return (
    <li className={classes.NavigationItem}>
      <NavLink to={url} exact={exact} activeClassName={classes.active}>{children}</NavLink>
    </li>

  );
};

export default NavigationItem;
