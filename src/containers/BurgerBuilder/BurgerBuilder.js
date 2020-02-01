import React, {Component} from 'react';
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-orders';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler'
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class BurgerBuilder extends Component {
  state = {
    isPurchasing: false
  };

  componentDidMount() {
    this.props.onInitIngredients();
  }

  isPurchasable = () => {
    const sum = Object.keys(this.props.ings).map(iKey => this.props.ings[iKey]).reduce((sum, el) => sum + el, 0);

    return sum > 0;
  };

  startPurchasing = () => {
    this.setState({isPurchasing: true});
  };

  stopPurchasing = () => {
    this.setState({isPurchasing: false});
  };

  continuePurchase = () => {
    this.props.onPurchaseInit();
    if (this.props.isAuthenticated) {
      this.props.history.push('/checkout');
    } else {
      this.props.onSetAuthRedirectPath('/checkout');
      this.props.history.push('/auth');
    }
  };

  render() {
    const disabledInfo = {...this.props.ings};
    for(let key in disabledInfo) {
      disabledInfo[key] = disabledInfo[key] === 0;
    }

    let burger = this.props.error ? <p>Ingredients can't be loaded...</p>: <Spinner />;

    if(this.props.ings) {
      burger = (
        <>
          <Burger ingredients={this.props.ings}/>
          <BuildControls totalPrice={this.props.tp}
                       disabledInfo={disabledInfo}
                       purchaseable={this.isPurchasable()}
                       ingredientAdded={this.props.onIngredientAdded}
                       ingredientRemoved={this.props.onIngredientRemoved}
                       startPurchasing={this.startPurchasing}
                       isAuth={this.props.isAuthenticated}/>
        </>
      );
    }

    return (
      <>
        <Modal show={this.state.isPurchasing} modalClose={this.stopPurchasing}>
          {
            !this.props.ings ? <Spinner/> :
            <OrderSummary ingredients={this.props.ings} doCancel={this.stopPurchasing}
                          doContinue={this.continuePurchase} price={this.props.tp}/>
          }
        </Modal>
        {burger}
      </>
    )
  }
}

const mapStateToProps = state => {
  return {
    ings: state.burgerBuilder.ingredients,
    tp: state.burgerBuilder.totalPrice,
    error: state.burgerBuilder.error,
    isAuthenticated: state.auth.token !== null
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onIngredientAdded: (ingredientName) => dispatch(actions.addIngredient(ingredientName)),
    onIngredientRemoved: (ingredientName) => dispatch(actions.removeIngredient(ingredientName)),
    onInitIngredients: () => dispatch(actions.initIngredients()),
    onPurchaseInit: () => dispatch(actions.purchaseInit()),
    onSetAuthRedirectPath: (path) => dispatch(actions.setRedirectPath(path))
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
