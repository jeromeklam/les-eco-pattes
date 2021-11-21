import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { getNewJsonApi } from 'jsonapi-front';
import mime from 'mime-types';
import {
  CAUSE_PRINT_ONE_BEGIN,
  CAUSE_PRINT_ONE_SUCCESS,
  CAUSE_PRINT_ONE_FAILURE,
  CAUSE_PRINT_ONE_DISMISS_ERROR,
} from './constants';
import { downloadBlob } from '../../ui';
import { freeAssoApi } from '../../../common';

export function printOne(id, ediId) {
  return (dispatch) => {
    dispatch({
      type: CAUSE_PRINT_ONE_BEGIN,
    });
    const promise = new Promise((resolve, reject) => {
      const options = getNewJsonApi('FreeFW_PrintOptions', id, {prt_name : 'Cause', prt_type : 'EDITION', edi_id: ediId});
      const doRequest = freeAssoApi.post('/v1/asso/cause/print/' + id, options, {responseType: 'arraybuffer'});
      doRequest.then(
        (res) => {
          const type = res.headers['content-type'] || 'application/octet-stream';
          const extension = mime.extension(type);
          downloadBlob(res.data, type, 'FreeAssi_Cause_' + id + '.' + extension);
          dispatch({
            type: CAUSE_PRINT_ONE_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        (err) => {
          dispatch({
            type: CAUSE_PRINT_ONE_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });
    return promise;
  };
}

export function dismissPrintOneError() {
  return {
    type: CAUSE_PRINT_ONE_DISMISS_ERROR,
  };
}

export function usePrintOne() {
  const dispatch = useDispatch();

  const { printOnePending, printOneError } = useSelector(
    state => ({
      printOnePending: state.cause.printOnePending,
      printOneError: state.cause.printOneError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback((...args) => {
    return dispatch(printOne(...args));
  }, [dispatch]);

  const boundDismissError = useCallback(() => {
    return dispatch(dismissPrintOneError());
  }, [dispatch]);

  return {
    printOne: boundAction,
    printOnePending,
    printOneError,
    dismissPrintOneError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case CAUSE_PRINT_ONE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        printOnePending: true,
        printOneError: null,
      };

    case CAUSE_PRINT_ONE_SUCCESS:
      // The request is success
      return {
        ...state,
        printOnePending: false,
        printOneError: null,
      };

    case CAUSE_PRINT_ONE_FAILURE:
      // The request is failed
      return {
        ...state,
        printOnePending: false,
        printOneError: action.data.error,
      };

    case CAUSE_PRINT_ONE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        printOneError: null,
      };

    default:
      return state;
  }
}
