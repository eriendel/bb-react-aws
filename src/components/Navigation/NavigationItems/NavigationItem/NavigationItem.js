import React from 'react';
import classes from './NavigationItem.css';

const NavigationItem = ({url, active, children}) => {
  return (
    <li className={classes.NavigationItem}>
      <a href={url} className={active ? classes.active : null}>{children}</a>
    </li>

  );
};

export default NavigationItem;
