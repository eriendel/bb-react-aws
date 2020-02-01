import React, {Component} from 'react';
import { connect } from 'react-redux';

import Button from "../../../components/UI/Button/Button";
import axios from '../../../axios-orders';
import classes from "./ContactData.css";
import Spinner from "../../../components/UI/Spinner/Spinner";
import Input from "../../../components/UI/Input/Input";
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../../store/actions/index';

class ContactData extends Component {
  state = {
    orderForm: {
      name: {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Name...'
        },
        value: '',
        valid: false,
        touched: false,
        validation: {
          required: true
        }
      },
      email: {
        elementType: 'input',
        elementConfig: {
          type: 'email',
          placeholder: 'Your Email...'
        },
        value: '',
        valid: false,
        touched: false,
        validation: {
          required: true
        }
      },
      street:  {
        elementType: 'input',
        elementConfig: {
          type: 'text',
          placeholder: 'Your Street Address...'
        },
        value: '',
        valid: false,
        touched: false,
        validation: {
          required: true
        }
      },
      zip:  {
        elementType: 'input',
        elementConfig: {
          type: 'number',
          placeholder: 'Your Zip...'
        },
        value: '',
        valid: false,
        touched: false,
        validation: {
          required: true,
          minLength: 5,
          maxLength: 5
        }
      },
      deliveryMethod:  {
        elementType: 'select',
        elementConfig: {
          options: [
            {
              value: 'fastest',
              displayValue: 'Fastest'
            },
            {
              value: 'cheapest',
              displayValue: 'Cheapest'
            }
          ]
        },
        value: 'fastest'
      }
    },
    formIsValid: false,
  };

  checkValidity = (value, rules) => {
    if(!rules) {
      return true;
    }
    let isValid = !!(!rules.required || value.trim().length);
    isValid = isValid && !!(!rules.minLength || value.trim().length >= rules.minLength);
    isValid = isValid && !!(!rules.maxLength || value.trim().length <= rules.maxLength);

    return isValid;
  };

  inputChangedHandler = (event, inputKey) => {
    const orderForm = {
      ...this.state.orderForm,
    };
    orderForm[inputKey] = {
      ...this.state.orderForm[inputKey],
      value: event.target.value,
      touched: true,
      valid: this.checkValidity(event.target.value, this.state.orderForm[inputKey].validation)
    };

    let formIsValid = true;

    for(let inputIdentifier in this.state.orderForm) {
      formIsValid = formIsValid && (this.state.orderForm[inputIdentifier].valid || !this.state.orderForm[inputIdentifier].validation);
    }

    this.setState({
      orderForm,
      formIsValid
    });
  };

  orderHandler = (event) => {
    event.preventDefault();

    const formData = {};
    for(let formElementIdentifier in this.state.orderForm) {
      formData[formElementIdentifier] = this.state.orderForm[formElementIdentifier].value;
    }

    const order = {
      ingredients: this.props.ings,
      price: this.props.tp,
      orderData: formData
    };

    this.props.onOrderBurger(order, this.props.token);
  };

  render() {
    const formElements = Object.keys(this.state.orderForm).map((configKey) => {
      return {
        id: configKey,
        config: this.state.orderForm[configKey]
      };
    });
    let form = (
      <form>
        {formElements.map(fe => {
          return <Input key={fe.id}
                        elementType={fe.config.elementType}
                        elementConfig={fe.config.elementConfig}
                        value={fe.config.value}
                        changed={(event) => this.inputChangedHandler(event, fe.id)}
                        invalid={fe.config.validation && fe.config.touched && !fe.config.valid}/>
        })}
        <Button btnType="Success" disabled={!this.state.formIsValid} clicked={this.orderHandler}>SUBMIT</Button>
      </form>
    );

    if(this.props.loading) {
      form = <Spinner/>;
    }

    return (
      <div className={classes.ContactData}>
        <h4>Enter your Contact Data</h4>
        {form}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    tp: state.burgerBuilder.totalPrice,
    loading: state.order.loading,
    token: state.auth.token
  };
};

const mapDispatchToProps = dispatch => {
  return {
    onOrderBurger: (orderData, token) => { dispatch(actions.purchaseBurger(orderData, token))}
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(ContactData, axios));
