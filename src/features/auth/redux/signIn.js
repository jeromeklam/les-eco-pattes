import {
  jsonApiNormalizer,
  buildModel,
  freeAssoApi,
  initAxios
} from '../../../common';
import {
  AUTH_SIGN_IN_BEGIN,
  AUTH_SIGN_IN_SUCCESS,
  AUTH_SIGN_IN_FAILURE,
  AUTH_SIGN_IN_DISMISS_ERROR,
} from './constants';
import cookie from 'react-cookies';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function signIn(args = {}) {
  return dispatch => {
    // optionally you can have getState as the second argument
    dispatch({
      type: AUTH_SIGN_IN_BEGIN,
    });

    // Return a promise so that you could control UI flow without states in the store.
    // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
    // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
    // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
    const promise = new Promise((resolve, reject) => {
      // doRequest is a placeholder Promise. You should replace it with your own logic.
      // See the real-word example at:  https://github.com/supnate/rekit/blob/master/src/features/home/redux/fetchRedditReactjsList.js
      // args.error here is only for test coverage purpose.
      const doRequest = freeAssoApi.post('/v1/sso/signin', args);
      doRequest.then(
        res => {
          dispatch({
            type: AUTH_SIGN_IN_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        err => {
          dispatch({
            type: AUTH_SIGN_IN_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissSignInError() {
  return {
    type: AUTH_SIGN_IN_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case AUTH_SIGN_IN_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        signInPending: true,
        signInError: null,
      };

    case AUTH_SIGN_IN_SUCCESS:
      // The request is success
      const datas = action.data;
      let user = false;
      let token = false;
      let authenticated = false;
      if (datas && datas.headers && datas.headers.authorization) {
        token = datas.headers.authorization;
      }
      let autologin = false;
      if (datas && datas.headers && datas.headers.autologin) {
        autologin = datas.headers.autologin;
      }
      if (datas.data) {
        let object = jsonApiNormalizer(datas.data);
        user = buildModel(
          object,
          'FreeSSO_User',
          object.SORTEDELEMS[0]
        );
      }
      if (user) {
        authenticated = true;
        if (token) {
          cookie.save('Authorization', token, { path: '/' });
          initAxios(token);
        }
        if (autologin) {
          let aYearFromNow = new Date();
          aYearFromNow.setFullYear(aYearFromNow.getFullYear() + 1);
          cookie.save('AutoLogin', autologin, { path: '/', expires: aYearFromNow });
        }
      }
      return {
        ...state,
        token: token,
        user: user,
        authenticated: authenticated,
        signInPending: false,
        signInError: null,
      };

    case AUTH_SIGN_IN_FAILURE:
      // The request is failed
      let error = null;
      if (action.data.error && action.data.error.response) {
        error = jsonApiNormalizer(action.data.error.response);
      }
      return {
        ...state,
        signInPending: false,
        signInError: error,
      };

    case AUTH_SIGN_IN_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        signInError: null,
      };

    default:
      return state;
  }
}
