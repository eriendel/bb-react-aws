import axios from 'axios';

import * as actionTypes from './actionTypes';

export const authStart = () => {
  return {
    type: actionTypes.AUTH_START
  };
};

export const authSuccess = (token, userId) => {
  return {
    type: actionTypes.AUTH_SUCCESS,
    token,
    userId
  };
};

export const authFail = (error) => {
  return {
    type: actionTypes.AUTH_FAIL,
    error
  };
};

export const logout = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('userId');
  localStorage.removeItem('expirationDate');
  return {
    type: actionTypes.AUTH_LOGOUT
  };
};

export const expireAuth = (expirationTime) => {
  return dispatch => {
    setTimeout(() => {
      dispatch(logout())
    }, expirationTime * 1000);
  };
};

export const auth = (email, password, isSignUp) => {
  return (dispatch) => {
    dispatch(authStart());
    const authData = { email, password, returnSecureToken: true};
    const mode = isSignUp ? 'signupNewUser' : 'verifyPassword';
    axios.post(`https://www.googleapis.com/identitytoolkit/v3/relyingparty/${mode}?key=AIzaSyBYOl8VxiSpPKHZqoi2qxkSO2moMDFpXrg`, authData)
      .then((res) => {
        const expirationDate = new Date(new Date().getTime() + res.data.expiresIn * 1000);
        localStorage.setItem('token', res.data.idToken);
        localStorage.setItem('expirationDate', expirationDate);
        localStorage.setItem('userId', res.data.localId);
        dispatch(authSuccess(res.data.idToken, res.data.localId));
        dispatch(expireAuth(res.data.expiresIn));
      })
      .catch(error => dispatch(authFail(error.response.data.error)));
  };
};

export const setRedirectPath = (path) => {
  return  {
    type: actionTypes.AUTH_SET_REDIRECT_PATH,
    path
  }
};

export const checkAuthState = dispatch => {
  return dispatch => {
    const token = localStorage.getItem('token');
    if(!token) {
      dispatch(logout());
    }else {
      const expirationDate = new Date(localStorage.getItem('expirationDate'));

      if (expirationDate <= new Date()) {
        dispatch(logout());
      } else {
        const userId = localStorage.getItem('userId');
        dispatch(authSuccess(token, userId));
        dispatch(expireAuth((expirationDate.getTime() - new Date().getTime())/ 1000))
      }
    }
  };
};
