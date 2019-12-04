import { freeAssoApi, jsonApiNormalizer, objectToQueryString } from '../../../common';
import {
  CLIENT_LOAD_MORE_INIT,
  CLIENT_LOAD_MORE_BEGIN,
  CLIENT_LOAD_MORE_SUCCESS,
  CLIENT_LOAD_MORE_FAILURE,
  CLIENT_LOAD_MORE_DISMISS_ERROR,
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function loadMore(args = {}, reload = false) {
  return (dispatch, getState) => { // optionally you can have getState as the second argument
    const loaded = getState().site.loadMoreFinish;
    if (!loaded || reload) {
      if (reload) {
        dispatch({
          type: CLIENT_LOAD_MORE_INIT,
        });
      } else {
        dispatch({
          type: CLIENT_LOAD_MORE_BEGIN,
        });
      }

      // Return a promise so that you could control UI flow without states in the store.
      // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
      // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
      // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
      const promise = new Promise((resolve, reject) => {
        // doRequest is a placeholder Promise. You should replace it with your own logic.
        // See the real-word example at:  https://github.com/supnate/rekit/blob/master/src/features/home/redux/fetchRedditReactjsList.js
        // args.error here is only for test coverage purpose.
        let params = {
          page: { number: getState().site.page_number, size: getState().site.page_size },
        };
        if (args && Object.keys(args).length > 0 && args !== '') {
          params.filter = { 
            or: {
              cli_firstname: args,
              cli_lastname: args
            }
          };
        }
        const addUrl = objectToQueryString(params);
        const doRequest = freeAssoApi.get('/v1/asso/client' + addUrl, {});
        doRequest.then(
          (res) => {
            dispatch({
              type: CLIENT_LOAD_MORE_SUCCESS,
              data: res,
            });
            resolve(res);
          },
          // Use rejectHandler as the second argument so that render errors won't be caught.
          (err) => {
            dispatch({
              type: CLIENT_LOAD_MORE_FAILURE,
              data: { error: err },
            });
            reject(err);
          },
        );
      });
      return promise;
    }
  };
}

// Async action saves request error by default, this method is used to dismiss the error info.
// If you don't want errors to be saved in Redux store, just ignore this method.
export function dismissLoadMoreError() {
  return {
    type: CLIENT_LOAD_MORE_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CLIENT_LOAD_MORE_INIT:
      // Just after a request is sent
      return {
        ...state,
        loadMorePending: true,
        loadMoreError: null,
        loadMoreFinish: false,
        items: [],
        page_number: 1,
        page_size: process.env.REACT_APP_PAGE_SIZE,
      };

    case CLIENT_LOAD_MORE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        loadMorePending: true,
        loadMoreError: null,
      };

    case CLIENT_LOAD_MORE_SUCCESS:
      // The request is success
      let list = {};
      let nbre = 0;
      let result = false;
      if (action.data && action.data.data) {
        result = action.data.data;
      }
      if (result.data) {
        nbre = result.data.length;
      }
      if (nbre > 0) {
        if (state.items) {
          list = jsonApiNormalizer(result, state.items);
        } else {
          list = jsonApiNormalizer(result);
        }
      } else {
        list = state.items;
      }
      return {
        ...state,
        loadMorePending: false,
        loadMoreError: null,
        loadMoreFinish: (nbre < state.page_size),
        items: list,
        page_number: state.page_number+1
      };

    case CLIENT_LOAD_MORE_FAILURE:
      // The request is failed
      return {
        ...state,
        loadMorePending: false,
        loadMoreError: action.data.error,
      };

    case CLIENT_LOAD_MORE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        loadMoreError: null,
      };

    default:
      return state;
  }
}
