import { useCallback } from 'react';
import { useDispatch, useSelector, shallowEqual } from 'react-redux';
import mime from 'mime-types';
import {
  INBOX_DOWNLOAD_ONE_BEGIN,
  INBOX_DOWNLOAD_ONE_SUCCESS,
  INBOX_DOWNLOAD_ONE_FAILURE,
  INBOX_DOWNLOAD_ONE_DISMISS_ERROR,
} from './constants';
import { downloadBlob } from '../../ui';
import { freeAssoApi } from '../../../common';

export function downloadOne(elem) {
  return dispatch => {
    dispatch({
      type: INBOX_DOWNLOAD_ONE_BEGIN,
    });

    const promise = new Promise((resolve, reject) => {
      const doRequest = freeAssoApi.get('/v1/core/inbox/download/' + elem.id, {responseType: 'arraybuffer'});
      doRequest.then(
        res => {
          const type = res.headers['content-type'] || 'application/octet-stream';
          const extension = mime.extension(type);
          downloadBlob(res.data, 'application/octet-stream', elem.inbox_filename);
          dispatch({
            type: INBOX_DOWNLOAD_ONE_SUCCESS,
            data: res,
          });
          resolve(res);
        },
        err => {
          dispatch({
            type: INBOX_DOWNLOAD_ONE_FAILURE,
            data: { error: err },
          });
          reject(err);
        },
      );
    });

    return promise;
  };
}

export function dismissDownloadOneError() {
  return {
    type: INBOX_DOWNLOAD_ONE_DISMISS_ERROR,
  };
}

export function useDownloadOne() {
  const dispatch = useDispatch();

  const { downloadOnePending, downloadOneError } = useSelector(
    state => ({
      downloadOnePending: state.inbox.downloadOnePending,
      downloadOneError: state.inbox.downloadOneError,
    }),
    shallowEqual,
  );

  const boundAction = useCallback(
    (...args) => {
      return dispatch(downloadOne(...args));
    },
    [dispatch],
  );

  const boundDismissError = useCallback(() => {
    return dispatch(dismissDownloadOneError());
  }, [dispatch]);

  return {
    downloadOne: boundAction,
    downloadOnePending,
    downloadOneError,
    dismissDownloadOneError: boundDismissError,
  };
}

export function reducer(state, action) {
  switch (action.type) {
    case INBOX_DOWNLOAD_ONE_BEGIN:
      // Just after a request is sent
      return {
        ...state,
        downloadOnePending: true,
        downloadOneError: null,
      };

    case INBOX_DOWNLOAD_ONE_SUCCESS:
      // The request is success
      return {
        ...state,
        downloadOnePending: false,
        downloadOneError: null,
      };

    case INBOX_DOWNLOAD_ONE_FAILURE:
      // The request is failed
      return {
        ...state,
        downloadOnePending: false,
        downloadOneError: action.data.error,
      };

    case INBOX_DOWNLOAD_ONE_DISMISS_ERROR:
      // Dismiss the request failure error
      return {
        ...state,
        downloadOneError: null,
      };

    default:
      return state;
  }
}
