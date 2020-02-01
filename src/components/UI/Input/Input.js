import React from 'react';
import classes from './Input.css';

const Input = (props) => {
  let inputElement = null;
  const inputClasses = [classes.InputElement];
  if(props.invalid) {
    inputClasses.push(classes.Invalid)
  }

  switch (props.elementType) {
    case ('textarea'):
      inputElement = <textarea className={inputClasses.join(' ')}
                               {...props.elementConfig}
                               value={props.value}
                               onChange={props.changed}></textarea>;
      break;
    case ('select'):
      inputElement = (
        <select className={inputClasses.join(' ')}
                value={props.value}
                onChange={props.changed}>
          {props.elementConfig.options.map(oConfig => {
            return (<option key={oConfig.value} value={oConfig.value}>{oConfig.displayValue}</option>);
          })}
        </select>
      );
      break;
    default:
      inputElement = <input className={inputClasses.join(' ')}
                            {...props.elementConfig}
                            value={props.value}
                            onChange={props.changed}/>;
  }

  return (
    <div className={classes.Input}>
      <label className={classes.Label}>{props.label}</label>
      {inputElement}
    </div>
  );
};

export default Input;
