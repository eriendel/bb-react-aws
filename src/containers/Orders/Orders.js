import React, {Component} from 'react';
import { connect } from 'react-redux';

import Order from "../../components/Order/Order";
import axios from '../../axios-orders';
import Spinner from "../../components/UI/Spinner/Spinner";
import withErrorHandler from "../../hoc/withErrorHandler/withErrorHandler";
import * as actions from '../../store/actions/index';

class Orders extends Component {
  componentDidMount() {
    this.props.onFetchOrders(this.props.token);
  }

  render() {
    return (
      <div>
        {
          !this.props.loading ? (this.props.orders.map(o => {
            return (<Order key={o.id}
                           ingredients={o.ingredients}
                           price={o.price}/>);
          })) : <Spinner />
        }
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    orders: state.order.orders,
    loading: state.order.loading,
    token: state.auth.token
  }
};
const mapDispatchToProps = (dispatch) => {
  return {
    onFetchOrders: (token) => dispatch(actions.fetchOrders(token))
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
