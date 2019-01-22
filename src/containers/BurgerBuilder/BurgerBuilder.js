import React, {Component} from 'react';
import Burger from "../../components/Burger/Burger";
import BuildControls from "../../components/Burger/BuildControls/BuildControls";
import Modal from "../../components/UI/Modal/Modal";
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import axios from '../../axios-orders';
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler"

const INGREDIENT_PRICES = {
  salad: 0.5,
  bacon: 0.7,
  meat: 1.3,
  cheese: 0.4
};

class BurgerBuilder extends Component {
  state = {
    ingredients: null,
    totalPrice: 4,
    isPurchaseable: false,
    isPurchasing: false,
    loading: false,
    error: false
  };

  componentDidMount() {
    axios.get('ingredients.json').then(res => {
      this.setState({ingredients: res.data});
    }).catch(() => {
      this.setState({error: true})
    });
  }


  updatePurchaseableState = (ingredients) => {
    const sum = Object.keys(ingredients).map(iKey => ingredients[iKey]).reduce((sum, el) => sum + el, 0);

    this.setState({
      isPurchaseable: sum > 0,
    })
  };

  startPurchasing = () => {
    this.setState({isPurchasing: true});
  };

  stopPurchasing = () => {
    this.setState({isPurchasing: false});
  };

  continuePurchase = () => {
    this.setState({loading: true});
    const order = {
      ingredients: this.state.ingredients,
      price: this.state.totalPrice,
      customer: {
        name: 'Jane Adams',
        address: {
          street: '1 Avenue, 1',
          zip: '12345',
          country: 'Ukraine'
        }
      },
      deliveryMethod: 'fast '
    };

    axios.post('/orders.json', order).then((response) => {
      this.setState({loading: false, isPurchasing: false});
    }).catch(e => {
      this.setState({loading: false, isPurchasing: false});
    });
  };

  addIngredient = (type) => {
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type]++;

    this.setState({
      ...this.state,
      ingredients: updatedIngredients,
      totalPrice: this.state.totalPrice + INGREDIENT_PRICES[type]
    });
    this.updatePurchaseableState(updatedIngredients);
  };
  removeIngredient = (type) => {
    const updatedIngredients = {
      ...this.state.ingredients
    };
    updatedIngredients[type]--;
    if(updatedIngredients[type] < 0) {
      return;
    }

    this.setState({
      ...this.state,
      ingredients: updatedIngredients,
      totalPrice: this.state.totalPrice - INGREDIENT_PRICES[type]
    });
    this.updatePurchaseableState(updatedIngredients);
  };

  render() {
    const disabledInfo = {...this.state.ingredients};
    for(let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] === 0;
    }

    let burger = this.state.error ? <p>Ingredients can't be loaded...</p>: <Spinner />;

    if(this.state.ingredients) {
      burger = (
        <>
          <Burger ingredients={this.state.ingredients}/>
          <BuildControls totalPrice={this.state.totalPrice}
                       disabledInfo={disabledInfo}
                       purchaseable={this.state.isPurchaseable}
                       ingredientAdded={this.addIngredient}
                       ingredientRemoved={this.removeIngredient}
                       startPurchasing={this.startPurchasing} />
        </>
      );
    }

    return (
      <>
        <Modal show={this.state.isPurchasing} modalClose={this.stopPurchasing}>
          {
            this.state.loading || !this.ingredients ? <Spinner/> :
            <OrderSummary ingredients={this.state.ingredients} doCancel={this.stopPurchasing}
                          doContinue={this.continuePurchase} price={this.state.totalPrice}/>
          }
        </Modal>
        {burger}
      </>
    )
  }
}

export default withErrorHandler(BurgerBuilder, axios);
