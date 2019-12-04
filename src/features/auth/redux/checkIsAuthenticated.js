import {
  AUTH_CHECK_IS_AUTHENTICATED_BEGIN,
  AUTH_CHECK_IS_AUTHENTICATED_SUCCESS,
  AUTH_CHECK_IS_AUTHENTICATED_FAILURE,
  AUTH_CHECK_IS_AUTHENTICATED_DISMISS_ERROR,
} from './constants';
import {
  jsonApiNormalizer,
  buildModel,
  initAxios,
  freeAssoApi
} from '../../../common';
import cookie from 'react-cookies';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function checkIsAuthenticated(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: AUTH_CHECK_IS_AUTHENTICATED_BEGIN,
    });

    // Return a promise so that you could control UI flow without states in the store.
    // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
    // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
    // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
    const promise = new Promise((resolve, reject) => {
      // doRequest is a placeholder Promise. You should replace it with your own logic.
      // See the real-word example at:  https://github.com/supnate/rekit/blob/master/src/features/home/redux/fetchRedditReactjsList.js
      // args.error here is only for test coverage purpose.
      const doRequest = freeAssoApi.post('/v1/sso/check');
      doRequest.then(
        (res) => {
          dispatch({
            type: AUTH_CHECK_IS_AUTHENTICATED_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: AUTH_CHECK_IS_AUTHENTICATED_FAILURE,
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
export function dismissCheckIsAuthenticatedError() {
  return {
    type: AUTH_CHECK_IS_AUTHENTICATED_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case AUTH_CHECK_IS_AUTHENTICATED_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        checkIsAuthenticatedPending: true,
        checkIsAuthenticatedError: null,
      };

    case AUTH_CHECK_IS_AUTHENTICATED_SUCCESS:
      // The request is success
      const datas = action.data;
      let user = false;
      let token = false;
      let authenticated = false;
      if (datas && datas.headers && datas.headers.authorization) {
        token = datas.headers.authorization;
      }
      if (datas.data) {
        let object = jsonApiNormalizer(datas.data);
        user = buildModel(
          object,
          'FreeSSO_User'
        );
      }
      if (token && user) {
        authenticated = true;
        cookie.save('Authorization', token, { path: '/' });
        initAxios(token);
      }
      return {
        ...state,
        token: token,
        user: user,
        authenticated: authenticated,
        checkIsAuthenticatedPending: false,
        checkIsAuthenticatedError: null,
      };

    case AUTH_CHECK_IS_AUTHENTICATED_FAILURE:
      // The request is failed
      return {
        ...state,
        checkIsAuthenticatedPending: false,
        checkIsAuthenticatedError: action.data.error || null,
      };

    case AUTH_CHECK_IS_AUTHENTICATED_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        checkIsAuthenticatedError: null,
      };

    default:
      return state;
  }
}
