import React from 'react';
import logoImg from '../../assets/images/burger-logo.png';
import classes from './Logo.css';

const Logo = () => {
  return (
    <div className={classes.Logo}>
      <img src={logoImg} alt="Burger Builder Logo"/>
    </div>
  );
};

export default Logo;
