import React, {Component} from 'react';

import Modal from '../../components/UI/Modal/Modal';

const WithErrorHandler = (WrappedComponent, axios) => {
  return class extends Component {
    state = {
      error: null
    };

    componentWillMount() {
      this.reqInterceptor = axios.interceptors.request.use( (req) => {
        this.setState({error: null});

        return req;
      });

      this.resInterceptor = axios.interceptors.response.use(res => res, (error) => {
        this.setState({error});
      });
    }

    componentWillUnmount() {
      console.log('ejected', this.reqInterceptor, this.resInterceptor);

      axios.interceptors.request.eject(this.reqInterceptor);
      axios.interceptors.response.eject(this.resInterceptor);
    }

    errorConfirmed = () => {
      this.setState({error: null});
    };

    render() {
      return (
        <>
          <Modal show={this.state.error} modalClose={this.errorConfirmed}>
            {this.state.error ? this.state.error.message : null}
          </Modal>
          <WrappedComponent {...this.props} />
        </>
      );
    }
  }
};

export default WithErrorHandler;
