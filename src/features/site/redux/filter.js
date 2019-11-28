import axios from 'axios';
import { jsonApiNormalizer, objectToQueryString } from '../../../common';
import {
  SITE_FILTER_BEGIN,
  SITE_FILTER_SUCCESS,
  SITE_FILTER_FAILURE,
  SITE_FILTER_DISMISS_ERROR,
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function filter(args = {}) {
  return (dispatch, getState) => { // optionally you can have getState as the second argument
    dispatch({
      type: SITE_FILTER_BEGIN,
    });

    // Return a promise so that you could control UI flow without states in the store.
    // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
    // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
    // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
    const promise = new Promise((resolve, reject) => {
      // doRequest is a placeholder Promise. You should replace it with your own logic.
      // See the real-word example at:  https://github.com/supnate/rekit/blob/master/src/features/home/redux/fetchRedditReactjsList.js
      // args.error here is only for test coverage purpose.

      //http://freeasso.fr:8080/api/v1/asso/site?page[number]=1&page[size]=20&filter[and][site_name]=local
      const params = {
        page: { number: getState().site.page_number, size: getState().site.page_size },
        filter: { 
          and: {
            site_name: args
          }
        }
      };
      const addUrl = objectToQueryString(params);
      const doRequest = axios.get(process.env.REACT_APP_BO_URL + '/v1/asso/site' + addUrl, {});
      doRequest.then(
        (res) => {
          dispatch({
            type: SITE_FILTER_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: SITE_FILTER_FAILURE,
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
export function dismissFilterError() {
  return {
    type: SITE_FILTER_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case SITE_FILTER_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        filterPending: true,
        filterError: null,
      };

    case SITE_FILTER_SUCCESS:
      // The request is success
      return {
        ...state,
        filterPending: false,
        filterError: null,
      };

    case SITE_FILTER_FAILURE:
      // The request is failed
      return {
        ...state,
        filterPending: false,
        filterError: action.data.error,
      };

    case SITE_FILTER_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        filterError: null,
      };

    default:
      return state;
  }
}
