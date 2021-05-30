import { useEffect, useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import { getNewJsonApi } from 'jsonapi-front';
import { freeAssoApi } from '../../../common';
import { downloadBlob } from '../../ui';
import mime from 'mime-types';
import {
  SITE_PRINT_ONE_BEGIN,
  SITE_PRINT_ONE_SUCCESS,
  SITE_PRINT_ONE_FAILURE,
  SITE_PRINT_ONE_DISMISS_ERROR,
} from './constants';

export function printOne(siteId, ediId) {
  return (dispatch) => {
    dispatch({
      type: SITE_PRINT_ONE_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const options = getNewJsonApi('FreeFW_PrintOptions', siteId, {prt_name : 'SITE', prt_type : 'EDITION', edi_id: ediId});
      const doRequest = freeAssoApi.post('/v1/asso/site/print/' + siteId, options, {responseType: 'arraybuffer',});
      doRequest.then(
        (result) => {
          const type = result.headers['content-type'] || 'application/octet-stream';
          const extension = mime.extension(type);
          downloadBlob(result.data, type, 'FreeAsso_Site_' + siteId + '.' + extension);
          resolve(result);
        },
        (err) => {
          dispatch({
            type: SITE_PRINT_ONE_FAILURE,
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
    type: SITE_PRINT_ONE_DISMISS_ERROR,
  };
}

export function usePrintOne() {
  const dispatch = useDispatch();

  const { printOnePending, printOneError } = useSelector(
    state => ({
      printOnePending: state.site.printOnePending,
      printOneError: state.site.printOneError,
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
    case SITE_PRINT_ONE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        printOnePending: true,
        printOneError: null,
      };

    case SITE_PRINT_ONE_SUCCESS:
      // The request is success
      return {
        ...state,
        printOnePending: false,
        printOneError: null,
      };

    case SITE_PRINT_ONE_FAILURE:
      // The request is failed
      return {
        ...state,
        printOnePending: false,
        printOneError: action.data.error,
      };

    case SITE_PRINT_ONE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        printOneError: null,
      };

    default:
      return state;
  }
}
