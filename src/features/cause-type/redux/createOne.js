import { freeAssoApi } from '../../../common';
import {
  CAUSE_TYPE_CREATE_ONE_BEGIN,
  CAUSE_TYPE_CREATE_ONE_SUCCESS,
  CAUSE_TYPE_CREATE_ONE_FAILURE,
  CAUSE_TYPE_CREATE_ONE_DISMISS_ERROR,
} from './constants';

// Rekit uses redux-thunk for async actions by default: https://github.com/gaearon/redux-thunk
// If you prefer redux-saga, you can use rekit-plugin-redux-saga: https://github.com/supnate/rekit-plugin-redux-saga
export function createOne(args = {}) {
  return (dispatch) => { // optionally you can have getState as the second argument
    dispatch({
      type: CAUSE_TYPE_CREATE_ONE_BEGIN,
    });

    // Return a promise so that you could control UI flow without states in the store.
    // For example: after submit a form, you need to redirect the page to another when succeeds or show some errors message if fails.
    // It's hard to use state to manage it, but returning a promise allows you to easily achieve it.
    // e.g.: handleSubmit() { this.props.actions.submitForm(data).then(()=> {}).catch(() => {}); }
    const promise = new Promise((resolve, reject) => {
      // doRequest is a placeholder Promise. You should replace it with your own logic.
      // See the real-word example at:  https://github.com/supnate/rekit/blob/master/src/features/home/redux/fetchRedditReactjsList.js
      // args.error here is only for test coverage purpose.
      // Mise à jour du type par défaut si non renseigné
      if (args.data.attributes.caut_mnt_type == null ) {
        args.data.attributes.caut_mnt_type = 'OTHER';
      }
      const doRequest = freeAssoApi.post('/v1/asso/cause_type', args);
      doRequest.then(
        (res) => {
          dispatch({
            type: CAUSE_TYPE_CREATE_ONE_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        // Use rejectHandler as the second argument so that render errors won't be caught.
        (err) => {
          dispatch({
            type: CAUSE_TYPE_CREATE_ONE_FAILURE,
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
export function dismissCreateOneError() {
  return {
    type: CAUSE_TYPE_CREATE_ONE_DISMISS_ERROR,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CAUSE_TYPE_CREATE_ONE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        createOnePending: true,
        createOneError: null,
      };

    case CAUSE_TYPE_CREATE_ONE_SUCCESS:
      // The request is success
      return {
        ...state,
        createOnePending: false,
        createOneError: null,
      };

    case CAUSE_TYPE_CREATE_ONE_FAILURE:
      // The request is failed
      return {
        ...state,
        createOnePending: false,
        createOneError: action.data.error,
      };

    case CAUSE_TYPE_CREATE_ONE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        createOneError: null,
      };

    default:
      return state;
  }
}
