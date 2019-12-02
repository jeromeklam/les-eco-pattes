import axios from 'axios';
import {
  jsonApiNormalizer,
  jsonApiUpdate
} from '../../../common';
import {
  EMAIL_UPDATE_ONE_BEGIN,
  EMAIL_UPDATE_ONE_SUCCESS,
  EMAIL_UPDATE_ONE_FAILURE,
  EMAIL_UPDATE_ONE_DISMISS_ERROR,
  EMAIL_UPDATE_ONE_UPDATE
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function updateOne(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: EMAIL_UPDATE_ONE_BEGIN,
    });

    // Return a promise so that you could control UI flow without states in the store.
    // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
    // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
    // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
    const promise = new Promise((resolve, reject) => {
      // doRequest is a placeholder Promise. You should replace it with your own logic.
      // See the real-word example at:  https://github.com/supnate/rekit/blob/master/src/features/home/redux/fetchRedditReactjsList.js
      // args.error here is only for test coverage purpose.
      const id = args.id;
      const doRequest = axios.put(process.env.REACT_APP_BO_URL + '/v1/core/email/' + id, args);
      doRequest.then(
        (res) => {
          dispatch({
            type: EMAIL_UPDATE_ONE_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: EMAIL_UPDATE_ONE_FAILURE,
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
export function dismissUpdateOneError() {
  return {
    type: EMAIL_UPDATE_ONE_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case EMAIL_UPDATE_ONE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        updateOnePending: true,
        updateOneError: null,
      };

    case EMAIL_UPDATE_ONE_SUCCESS:
      // The request is success
      return {
        ...state,
        updateOnePending: false,
        updateOneError: null,
      };

    case EMAIL_UPDATE_ONE_FAILURE:
      // The request is failed
      return {
        ...state,
        updateOnePending: false,
        updateOneError: action.data.error,
      };

    case EMAIL_UPDATE_ONE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        updateOneError: null,
      };

    case EMAIL_UPDATE_ONE_UPDATE:
      let object  = jsonApiNormalizer(action.data.data);
      let myItems = state.items;
      let news = jsonApiUpdate(myItems, 'FreeFW_Email', object);
      return {
        ...state,
        updateOneError: null,
        items: news
      };     

    default:
      return state;
  }
}
