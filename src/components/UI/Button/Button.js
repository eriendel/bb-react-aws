import React from 'react';
import classes from './Button.css';

const Button = ({btnType, children, clicked}) => {
  return (
    <button onClick={clicked}
            className={[classes.Button, classes[btnType]].join(' ')}>{children}</button>
  );
};

export default Button;
