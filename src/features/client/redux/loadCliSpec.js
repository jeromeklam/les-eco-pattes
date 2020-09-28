import { objectToQueryString } from 'jsonapi-front';
import { freeAssoApi } from '../../../common';
import {
  CLIENT_LOAD_CLI_SPEC_BEGIN,
  CLIENT_LOAD_CLI_SPEC_SUCCESS,
  CLIENT_LOAD_CLI_SPEC_FAILURE,
  CLIENT_LOAD_CLI_SPEC_DISMISS_ERROR,
} from './constants';

export function loadCliSpec(args = {}) {
  return (dispatch) => { 
    dispatch({
      type: CLIENT_LOAD_CLI_SPEC_BEGIN,
    });


    const promise = new Promise((resolve, reject) => {
      const params = {
        params: {
          //clit_code: {eq: 'VETERINAIRE'},
        }
      }
      const addUrl = objectToQueryString(params);
      const doRequest = freeAssoApi.get('/v1/asso/client' + addUrl, {});
      doRequest.then(
        (res) => {
          dispatch({
            type: CLIENT_LOAD_CLI_SPEC_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: CLIENT_LOAD_CLI_SPEC_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissLoadCliSpecError() {
  return {
    type: CLIENT_LOAD_CLI_SPEC_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CLIENT_LOAD_CLI_SPEC_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        loadCliSpecPending: true,
        loadCliSpecError: null,
      };

    case CLIENT_LOAD_CLI_SPEC_SUCCESS:
      // The request is success
      return {
        ...state,
        loadCliSpecPending: false,
        loadCliSpecError: null,
      };

    case CLIENT_LOAD_CLI_SPEC_FAILURE:
      // The request is failed
      return {
        ...state,
        loadCliSpecPending: false,
        loadCliSpecError: action.data.error,
      };

    case CLIENT_LOAD_CLI_SPEC_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        loadCliSpecError: null,
      };

    default:
      return state;
  }
}
