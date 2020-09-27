import {
  AUTH_SIGN_OUT_BEGIN,
  AUTH_SIGN_OUT_SUCCESS,
  AUTH_SIGN_OUT_FAILURE,
  AUTH_SIGN_OUT_DISMISS_ERROR,
} from './constants';
import cookie from 'react-cookies';

export function signOut(args = {}) {
  return (dispatch) => {
    dispatch({
      type: AUTH_SIGN_OUT_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      const doRequest = args.error ? Promise.reject(new Error()) : Promise.resolve();
      doRequest.then(
        (res) => {
          cookie.remove('AutoLogin');
          dispatch({
            type: AUTH_SIGN_OUT_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: AUTH_SIGN_OUT_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });
    return promise;
  };
}

export function dismissSignOutError() {
  return {
    type: AUTH_SIGN_OUT_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case AUTH_SIGN_OUT_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        signOutPending: true,
        signOutError: null,
      };

    case AUTH_SIGN_OUT_SUCCESS:
      // The request is success
      cookie.remove('Authorization', { path: '/' });
      cookie.remove('AutoLogin', { path: '/' });
      return {
        ...state,
        authenticated: false,
        token: false,
        user: false,
        signOutPending: false,
        signOutError: null,
      };

    case AUTH_SIGN_OUT_FAILURE:
      cookie.remove('Authorization', { path: '/' });
      // The request is failed
      return {
        ...state,
        authenticated: false,
        token: false,
        user: false,
        signOutPending: false,
        signOutError: action.data.error,
      };

    case AUTH_SIGN_OUT_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        signOutError: null,
      };

    default:
      return state;
  }
}
