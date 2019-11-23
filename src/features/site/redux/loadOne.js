import axios from 'axios';
import { jsonApiNormalizer, buildModel } from '../../../common';
import {
  SITE_LOAD_ONE_BEGIN,
  SITE_LOAD_ONE_SUCCESS,
  SITE_LOAD_ONE_FAILURE,
  SITE_LOAD_ONE_DISMISS_ERROR,
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function loadOne(args = {}) {
  return dispatch => {
    // optionally you can have getState as the second argument
    dispatch({
      type: SITE_LOAD_ONE_BEGIN,
    });

    // Return a promise so that you could control UI flow without states in the store.
    // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
    // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
    // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
    const promise = new Promise((resolve, reject) => {
      // doRequest is a placeholder Promise. You should replace it with your own logic.
      // See the real-word example at:  https://github.com/supnate/rekit/blob/master/src/features/home/redux/fetchRedditReactjsList.js
      // args.error here is only for test coverage purpose.
      const doRequest = axios.get(process.env.REACT_APP_BO_URL + '/v1/asso/site/' + args);
      doRequest.then(
        res => {
          dispatch({
            type: SITE_LOAD_ONE_SUCCESS,
            data: res,
            id: args,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        err => {
          dispatch({
            type: SITE_LOAD_ONE_FAILURE,
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
export function dismissLoadOneError() {
  return {
    type: SITE_LOAD_ONE_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case SITE_LOAD_ONE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        loadOnePending: true,
        loadOneError: null,
      };

    case SITE_LOAD_ONE_SUCCESS:
      // The request is success
      let item = null;
      let raw  = null;
      let object = jsonApiNormalizer(action.data.data);
      raw  = buildModel(object, 'FreeAsso_Site', action.id);
      item = buildModel(object, 'FreeAsso_Site', action.id, {eager: true});
      return {
        ...state,
        loadOnePending: false,
        loadOneItem: item,
        loadOneRaw: item,
        loadOneError: null,
      };

    case SITE_LOAD_ONE_FAILURE:
      // The request is failed
      return {
        ...state,
        loadOnePending: false,
        loadOneItem: null,
        loadOneRaw: null,
        loadOneError: action.data.error,
      };

    case SITE_LOAD_ONE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        loadOneError: null,
      };

    default:
      return state;
  }
}
