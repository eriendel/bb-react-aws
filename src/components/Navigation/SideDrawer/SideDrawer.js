import React from 'react';
import Logo from "../../Logo/Logo";
import NavigationItems from "../NavigationItems/NavigationItems";
import classes from './SideDrawer.css';
import Backdrop from "../../UI/Backdrop/Backdrop";

const SideDrawer = ({show, closed}) => {
  return (
    <>
      <Backdrop show={show} click={closed}/>
      <div className={[classes.SideDrawer, show ? classes.Open : classes.Close].join(' ')}>
        <div className={classes.Logo}>
          <Logo/>
        </div>
        <nav>
          <NavigationItems/>
        </nav>
      </div>
    </>
  );
};

export default SideDrawer;
