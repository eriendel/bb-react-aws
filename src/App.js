import React, { Component } from 'react';
import {Redirect, Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';

import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './containers/BurgerBuilder/BurgerBuilder';
import Checkout from './containers/Checkout/Checkout';
import Orders from './containers/Orders/Orders';
import Auth from './containers/Auth/Auth';
import Logout from './containers/Auth/Logout/Logout';

import * as actions from './store/actions/index';

class App extends Component {
  componentDidMount() {
    this.props.onTryAutoLogin();
  }

  render() {
    let routes = (
      <Layout>
        <Route path="/" exact component={BurgerBuilder}></Route>
        <Route path="/auth" component={Auth}></Route>
        <Redirect to="/" />
      </Layout>
    );

    if(this.props.isAuth) {
      routes = (
        <Layout>
          <Route path="/checkout" component={Checkout}></Route>
          <Route path="/orders" component={Orders}></Route>
          <Route path="/logout" component={Logout}></Route>
          <Route path="/" exact component={BurgerBuilder}></Route>
          <Redirect to="/" />
        </Layout>
      );
    }

    return (<div className="App">{routes}</div>);
  }
}

const mapStateToProps = state => {
  return {
    isAuth: state.auth.token !== null
  }
};

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoLogin: () => dispatch(actions.checkAuthState())
  }
};

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(App));
