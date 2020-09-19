import {
  USER_LOAD_TOKENS_BEGIN,
  USER_LOAD_TOKENS_SUCCESS,
  USER_LOAD_TOKENS_FAILURE,
  USER_LOAD_TOKENS_DISMISS_ERROR,
} from './constants';

export function loadTokens(args = {}) {
  return (dispatch) => { 
    dispatch({
      type: USER_LOAD_TOKENS_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = args.error ? Promise.reject(new Error()) : Promise.resolve();
      doRequest.then(
        (res) => {
          dispatch({
            type: USER_LOAD_TOKENS_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: USER_LOAD_TOKENS_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissLoadTokensError() {
  return {
    type: USER_LOAD_TOKENS_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case USER_LOAD_TOKENS_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        loadTokensPending: true,
        loadTokensError: null,
      };

    case USER_LOAD_TOKENS_SUCCESS:
      // The request is success
      return {
        ...state,
        loadTokensPending: false,
        loadTokensError: null,
      };

    case USER_LOAD_TOKENS_FAILURE:
      // The request is failed
      return {
        ...state,
        loadTokensPending: false,
        loadTokensError: action.data.error,
      };

    case USER_LOAD_TOKENS_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        loadTokensError: null,
      };

    default:
      return state;
  }
}
