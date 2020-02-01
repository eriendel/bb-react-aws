import React, { Component } from 'react';
import {connect} from 'react-redux';

import * as classes from './Auth.css';

import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import * as actions from '../../store/actions/index';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import {Redirect} from 'react-router-dom';

class Auth extends Component {
  state = {
    controls: {
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Email'
        },
        value: '',
        valid: false,
        touched: false,
        validation: {
          required: true,
          isEmail: true
        }
      },
      password: {
        elementType: 'input',
        elementConfig: {
          type: 'password',
          placeholder: 'Password'
        },
        value: '',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 7
        }
      },
    },
    isSignUp: true
  };

  componentDidMount() {
    if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
      this.props.onResetAuthRedirectPath();
    }
  }

  checkValidity = (value, rules) => {
    if(!rules) {
      return true;
    }
    let isValid = !!(!rules.required || value.trim().length);
    isValid = isValid && !!(!rules.minLength || value.trim().length >= rules.minLength);
    isValid = isValid && !!(!rules.maxLength || value.trim().length <= rules.maxLength);
    isValid = isValid && !!(!rules.isEmail || /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(value))
    return isValid;
  };

  inputChangedHandler = (event, inputKey) => {
    const controls = {
      ...this.state.controls,
    };
    controls[inputKey] = {
      ...this.state.controls[inputKey],
      value: event.target.value,
      touched: true,
      valid: this.checkValidity(event.target.value, this.state.controls[inputKey].validation)
    };

    let formIsValid = true;

    for(let inputIdentifier in this.state.controls) {
      formIsValid = formIsValid && (this.state.controls[inputIdentifier].valid || !this.state.controls[inputIdentifier].validation);
    }

    this.setState({
      controls,
      formIsValid
    });
  };

  submitHandler = (event) => {
    event.preventDefault();
    this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignUp);
  };

  switchSignMode = () => {
    this.setState((prevState) => {
      return {isSignUp: !prevState.isSignUp};
    });
  };

  render() {
    const formElements = Object.keys(this.state.controls).map((configKey) => {
      return {
        id: configKey,
        config: this.state.controls[configKey]
      };
    });

    const errorMessage = this.props.error ? <p>{this.props.error.message}</p> : null;

    return this.props.isAuthenticated ?
        (<Redirect to={this.props.authRedirectPath}/>) :
        (
          <div className={classes.Auth}>
            {
              this.props.loading ? <Spinner/> :
                <form>
                  {formElements.map(fe => {
                    return <Input key={fe.id}
                                  elementType={fe.config.elementType}
                                  elementConfig={fe.config.elementConfig}
                                  value={fe.config.value}
                                  changed={(event) => this.inputChangedHandler(event, fe.id)}
                                  invalid={fe.config.validation && fe.config.touched && !fe.config.valid}/>
                  })}
                  {errorMessage}
                  <Button btnType="Success" disabled={!this.state.formIsValid} clicked={this.submitHandler}>SUBMIT</Button>
                </form>
            }
            <Button btnType="Danger" clicked={this.switchSignMode}>SWITCH TO SIGN {this.state.isSignUp ? 'IN' : 'UP'}</Button>
          </div>
        );
  }
}

const mapStateToProps = state => {
  return {
    loading: state.auth.loading,
    error: state.auth.error,
    isAuthenticated: state.auth.token !== null,
    buildingBurger: state.burgerBuilder.isBuilding,
    authRedirectPath: state.auth.redirectPath
  }
};
const mapDispatchToProps = dispatch => {
  return {
    onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
    onResetAuthRedirectPath: () => dispatch(actions.setRedirectPath('/'))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Auth, axios));
